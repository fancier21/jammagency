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
<div class="site">
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


	<div id="js-feedback" class="modal-box zoomOut">
		<div class="modal modalTalk js-modal">
			<div class="modal-body">
				<a href="#" class="modal-close js-modal-close" data-id="#js-feedback">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#0D0F0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L18 18" stroke="#0D0F0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>			</a>
				<div class="modalTalk-inner">
					<div class="modalTalk-head">
					<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/hellooo.svg" alt="" width="106" height="103" class="modalTalk-hellooo">
						<h2 class="modalTalk-title">Hellooo… It’s me</h2>
					</div>
					<div class="modalTalk-body">
    					<form id="feedback-form" class="modalTalk-form">
    						<div class="form-field">
    							<input
    							    type="text"
    								name="name"
    								id="username"
    								placeholder="שם">
    							<small></small>
    						</div>
    						<div class="form-field">
    							<input
     							type="tel"
     							name="phone"
                                    id="phone"
     							placeholder="נייד">
    							<small></small>
    						</div>
    						<div class="form-field">
    							<input
     							type="email"
     							name="email"
                                    id="email"
     							placeholder="אימייל">
    							<small></small>
    						</div>
    						<div class="form-field">
    							<textarea
    							    name="message"
    								id="message"
    								rows="2"
    								placeholder="על מה נדבר?"></textarea>
    							<small></small>
    						</div>
    						<!-- Honeypot for Spam Protection -->
    						<div style="display:none;">
                                <label for="honeypot">Leave this field empty:</label>
                                <input type="text" id="honeypot" name="honeypot">
                            </div>
                            <!-- Nonce field for security -->
                            <input type="hidden" id="feedback_nonce" name="feedback_nonce" value="<?php echo wp_create_nonce('feedback_form_nonce'); ?>" />
                 			<button type="submit" id="feedback-submit" class="feedback-btn">שליחה</button>
    					</form>
    					<div class="modalTalk-contacts">
    						<ul>
    							<li>
    								<a href="tel:+972509913755">972-509913755+</a>
    							</li>
    							<li>
    								<a href="mailto:hello@jammagency.com">hello@jammagency.com</a>
    							</li>
    						</ul>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>


<div id="js-modalSuccess" class="modal-box">
	<div class="modal modalSuccess js-modal">
		<div class="modal-body">
			<a href="#" class="modal-close js-modal-close" data-id="#js-modalSuccess">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#0D0F0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L18 18" stroke="#0D0F0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>			</a>
			<div class="modalSuccess-inner">
				<h2 class="modalSuccess-title" id="response-message"></h2>
				<div class="modalSuccess-action">
					<a href="#" class="feedback-btn js-modal-close" data-id="#js-modalSuccess">Close</a>
				</div>
			</div>
		</div>
	</div>
</div>
