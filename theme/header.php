<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jammagency
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/img/hellooo.svg" imagesrc="<?php echo get_template_directory_uri(); ?>/img/favicon/icon.png" type="image/svg+xml">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'jammagency' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-branding">
		    <a href="/" class="header-logo" aria-label="Logo">
				<img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="logo" width="48" height="60">
			</a>
		</div><!-- .site-branding -->
		<div class="header-options">
			<div class="header-talk js-modal-open" data-id="#js-feedback"><span>LET'S</span><span>TALK</span></div>
			<div class="header-menu js-sideModal-open" data-id="#js-menu" data-side="menu"><span>ME</span><span>NU</span></div>
		</div><!-- .header-options -->
	</header><!-- #masthead -->

	<div class="sideMenu js-sideModal" id="js-menu">
		<div class="sideMenu-inner">
			<a href="#" class="modal-close js-sideModal-close" data-id="#js-menu" aria-label="Close">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#0D0F0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L18 18" stroke="#0D0F0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
			</a>
			<nav class="sideMenu-nav">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'menu-1',
				)
			);
			?>
			</nav>
			<div class="sideMenu-contacts">
				<a href="tel:+972509913755">972-509913755+</a>
				<a href="mailto:hello@jammagency.com">hello@jammagency.com</a>
			</div>
		</div>
	</div><!-- .sideMenu -->
