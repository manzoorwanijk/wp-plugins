<?php
/**
 * The class responsible for loading the assets.
 *
 * Parts of this code are copied from https://github.com/eventespresso/barista/.
 */

/**
 * The class responsible for loading assets.
 */
class WP_Plugins_Dev {

	/**
	 * The entrypoints.
	 *
	 * @var array
	 */
	private $entry_points;

	/**
	 * The manifest content.
	 *
	 * @var array
	 */
	private $manifest;

	/**
	 * Style handles.
	 *
	 * @var array
	 */
	private $styles = array();

	/**
	 * Hooks into default script actions.
	 *
	 * @return void
	 */
	public function initialize() {
		add_action( 'wp_default_scripts', array( $this, 'register_scripts' ) );
		add_action( 'wp_default_styles', array( $this, 'register_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'add_assets' ) );
	}


	/**
	 * Retrieves a URL to a file in the ee_barista plugin.
	 *
	 * @param string $path Relative path of the desired file.
	 *
	 * @return string       Fully qualified URL pointing to the desired file.
	 *
	 * @since 0.0.1
	 */
	public function url( string $path ): string {
		return WP_PLUGINS_DEV_URL . $path;
	}


	/**
	 * Get the list of entry points.
	 *
	 * @return array
	 */
	protected function get_entry_points(): array {
		if ( ! $this->entry_points ) {
			$this->entry_points = array_keys( $this->get_manifest( 'entrypoints' ) );
		}
		return $this->entry_points;
	}


	/**
	 * Get the manifest content.
	 *
	 * @param string $key The key to get the values for.
	 * @return mixed
	 */
	protected function get_manifest( $key = 'files' ) {
		if ( ! $this->manifest ) {
			$manifest_path = WP_PLUGINS_DEV_DIR . 'build/asset-manifest.json';

			if ( ! file_exists( $manifest_path ) ) {
				wp_die( 'No manifest file found. Try yarn dev' );
			}

			// TODO May be use WP File system? ¯\_(ツ)_/¯.
			$manifest_json  = file_get_contents( $manifest_path );
			$this->manifest = json_decode( $manifest_json, true );
		}

		if ( empty( $this->manifest[ $key ] ) ) {
			wp_die( sprintf( 'No entry for %1$s found in manifest file.', $key ) );
		}

		return $this->manifest[ $key ];
	}


	/**
	 * Registers a script according to `wp_register_script`. Honors this request by
	 * reassigning internal dependency properties of any script handle already
	 * registered by that name. It does not deregister the original script, to
	 * avoid losing inline scripts which may have been attached.
	 *
	 * @param WP_Scripts       $scripts   WP_Scripts instance.
	 * @param string           $handle    Name of the script. Should be unique.
	 * @param string           $src       Full URL of the script, or path of the script relative to the WordPress root
	 *                                    directory.
	 * @param array            $deps      Optional. An array of registered script handles this script depends on.
	 *                                    Default empty array.
	 * @param string|bool|null $ver       Optional. String specifying script version number, if it has one, which is
	 *                                    added to the URL as a query string for cache busting purposes. If version is
	 *                                    set to false, a version number is automatically added equal to current
	 *                                    installed WordPress version. If set to null, no version is added.
	 * @param bool             $in_footer Optional. Whether to enqueue the script before </body> instead of in the
	 *                                    <head>. Default 'false'.
	 * @since 0.0.1
	 */
	protected function override_script(
		WP_Scripts $scripts,
		string $handle,
		string $src,
		array $deps = array(),
		$ver = false,
		$in_footer = false
	) {
		$script = $scripts->query( $handle );
		if ( $script ) {
			/*
			 * In many ways, this is a reimplementation of `wp_register_script` but
			 * bypassing consideration of whether a script by the given handle had
			 * already been registered.
			 */

			// See: `_WP_Dependency::__construct` .
			$script->src  = $src;
			$script->deps = $deps;
			$script->ver  = $ver;
			$script->args = $in_footer;
		} else {
			$scripts->add( $handle, $src, $deps, $ver, $in_footer );
		}

		$script = $scripts->query( $handle );
		if ( $script ) {
			/*
			* The script's `group` designation is an indication of whether it is
			* to be printed in the header or footer. The behavior here defers to
			* the arguments as passed. Specifically, group data is not assigned
			* for a script unless it is designated to be printed in the footer.
			*/
			// See: `wp_register_script` .
			unset( $script->extra['group'] );
			if ( $in_footer ) {
				$script->add_data( 'group', 1 );
			}
		}
	}


	/**
	 * Registers a style according to `wp_register_style`. Honors this request by
	 * de-registering any style by the same handler before registration.
	 *
	 * @param WP_Styles        $styles WP_Styles instance.
	 * @param string           $handle Name of the stylesheet. Should be unique.
	 * @param string           $src    Full URL of the stylesheet, or path of the stylesheet relative to the WordPress
	 *                                 root directory.
	 * @param array            $deps   Optional. An array of registered stylesheet handles this stylesheet depends on.
	 *                                 Default empty array.
	 * @param string|bool|null $ver    Optional. String specifying stylesheet version number, if it has one, which is
	 *                                 added to the URL as a query string for cache busting purposes. If version is set
	 *                                 to false, a version number is automatically added equal to current installed
	 *                                 WordPress version. If set to null, no version is added.
	 * @param string           $media  Optional. The media for which this stylesheet has been defined.
	 *                                 Default 'all'. Accepts media types like 'all', 'print' and 'screen', or media
	 *                                 queries like
	 *                                 '(orientation: portrait)' and '(max-width: 640px)'.
	 * @since 0.0.1
	 */
	protected function override_style(
		WP_Styles $styles,
		string $handle,
		string $src,
		array $deps = array(),
		$ver = false,
		$media = 'all'
	) {
		$style = $styles->query( $handle );
		if ( $style ) {
			$styles->remove( $handle );
		}
		// save the handle to use for loading styles for dev env.
		$this->styles[ $handle ] = true;

		$styles->add( $handle, $src, $deps, $ver, $media );
	}


	/**
	 * Registers all the WordPress packages scripts that are in the standardized
	 * `build/` location.
	 *
	 * @param WP_Scripts $scripts WP_Scripts instance.
	 * @since 0.0.1
	 */
	public function register_scripts( WP_Scripts $scripts ) {
		$asset_files  = $this->get_manifest();
		$entry_points = $this->get_entry_points();

		foreach ( $entry_points as $entry_point ) {
			$handle = $entry_point;

			// Get the path from root directory as expected by `$this->url`.
			$package_path = 'build' . $asset_files[ $entry_point . '.js' ];

			$dependencies = array();

			if ( ! empty( $asset_files[ $entry_point . '.php' ] ) ) {
				$asset_file   = WP_PLUGINS_DEV_DIR . 'build' . $asset_files[ $entry_point . '.php' ];
				$asset        = file_exists( $asset_file ) ? require $asset_file : null;
				$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : $dependencies;
			}

			// remove cyclical dependencies, if any.
			if ( ( $key = array_search( $handle, $dependencies, true ) ) !== false ) {
				unset( $dependencies[ $key ] );
			}
			$version = isset( $asset['version'] ) ? $asset['version'] : '';
			$version = '' === $version && file_exists( WP_PLUGINS_DEV_DIR . $package_path )
			? filemtime( WP_PLUGINS_DEV_DIR . $package_path )
			: false;

			$this->override_script(
				$scripts,
				$handle,
				$this->url( $package_path ),
				$dependencies,
				$version,
				true
			);
		}
	}


	/**
	 * Registers all the packages and domain styles that are in the build folder.
	 *
	 * @param WP_Styles $styles WP_Styles instance.
	 * @since 0.0.1
	 */
	public function register_styles( WP_Styles $styles ) {
		$asset_files  = $this->get_manifest();
		$entry_points = $this->get_entry_points();

		foreach ( $entry_points as $entry_point ) {
			$handle = $entry_point;

			$dependencies = array(); // May be we need it some day ¯\_(ツ)_/¯.

			if ( ! empty( $asset_files[ $entry_point . '.css' ] ) ) {
				$css_relative_path = 'build' . $asset_files[ $entry_point . '.css' ];
				$css_absolute_path = WP_PLUGINS_DEV_DIR . $css_relative_path;

				if ( file_exists( $css_absolute_path ) ) {
					$version = filemtime( $css_absolute_path );
					$this->override_style(
						$styles,
						$handle,
						$this->url( $css_relative_path ),
						$dependencies,
						$version
					);
				}
			}
		}
	}

	/**
	 * Adds DOM data and styles.
	 *
	 * @return void
	 */
	public function add_assets() {
		// Enqueue the empty style with all the barista styles as deps.
		wp_enqueue_style(
			'ee-barista',
			plugins_url( 'styles.css', __FILE__ ),
			array_keys( $this->styles ),
			'1.0.0'
		);

		wp_enqueue_script(
			'wp-plugins-dev',
			plugins_url( 'script.js', __FILE__ ),
			array( 'jquery' ),
			false
		);

		wp_add_inline_script(
			'wp-plugins-dev',
			sprintf( 'var wp_plugins_dev_url = "%s";', $this->url( 'build/' ) ),
			'before'
		);
	}
}
