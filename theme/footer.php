<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jammagency
 */

?>

    	<footer id="colophon" class="site-footer">
    		<div class="wrap">
    			<div class="footer-col">
    				<div class="footer-popup js-modal-open" data-id="#js-feedback">יצירת קשר</div>
    				<div class="subscribe js-form">
    					<div class="subscribe-info">הרשמה לניוזלטר</div>
    					<div class="input js-input">
    						<input type="email" name="email" class="input-field js-required js-email" placeholder="Email">
    					</div>
    					<div class="checkbox js-checkbox js-personalData">
    						<span class="checkbox-label">בהשארת הפרטים אני מאשר.ת קבלת תוכן שיווקי</span>
    						<span class="checkbox-input">
    							<svg class="checkbox-input-icon" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.51227 1.95374L2.93037 5.53561L1.30225 3.90749" stroke="white" stroke-width="1.05828" stroke-linecap="round" stroke-linejoin="round"/></svg>
    						</span>
    					</div>
    					<button class="subscribe-btn js-send" data-route="{{ route('subscribe.store') }}">הרשמה</button>
    				</div>
    				<div class="footer-contacts">
    					<div class="footer-social">
    						<a href="{{ $general->get('facebook') }}" target="_blank" aria-label="Facebook">

    						</a>
    						<a href="{{ $general->get('linkedin') }}" target="_blank" aria-label="LinkedIn">

    						</a>
    						<a href="{{ $general->get('whatsapp') }}" target="_blank" aria-label="WhatsApp">

    						</a>
    					</div>
    					<a href="{{ $general->get('instagram') }}" class="footer-instagram" target="_blank">jammagency_design#</a>
    				</div>
    			</div>
    			<div class="footer-nav">
     			<?php
     			wp_nav_menu(
        				array(
       					'theme_location' => 'menu-1',
       					'menu_id'        => 'primary-menu',
        				)
     			);
     			?>
    			</div>
    		</div>
    	</footer><!-- #colophon -->
    </div><!-- #page -->
    <script src="<?php echo get_template_directory_uri(); ?>/js/gsap.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/ScrollTrigger.min.js"></script>
    <script type="module" src="<?php echo get_template_directory_uri(); ?>/js/app.js"></script>
	<?php wp_footer(); ?>
</body>
</html>
