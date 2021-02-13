<?php
/**
 * The plugin main file.
 *
 * @link              https://t.me/manzoorwanijk
 * @since             1.0.0
 * @package           WPTelegram
 *
 * @wordpress-plugin
 * Plugin Name:       WP Plugins Dev
 * Plugin URI:        https://t.me/WPTelegram
 * Description:       Development Environment for WP Plugins
 * Version:           1.0.0
 * Author:            Manzoor Wani
 * Author URI:        https://t.me/manzoorwanijk
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       wp-plugins
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}


define( 'WP_PLUGINS_DEV_BASENAME', plugin_basename( __FILE__ ) );
define( 'WP_PLUGINS_DEV_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'WP_PLUGINS_DEV_URL', trailingslashit( plugins_url( '', __FILE__ ) ) );

require_once __DIR__ . '/lib/class-wp-plgins-dev.php';

$barista = new WP_Plugins_Dev();
$barista->initialize();
