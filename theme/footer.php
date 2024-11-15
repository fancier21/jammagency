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

    	<footer id="colophon" class="site-footer <?php if (is_page('policy') || is_page('accessibility')) { echo 'site-footer-p'; } ?>">
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
           					<a href="https://www.facebook.com/profile.php?id=100075511464241" target="_blank" aria-label="Facebook">
                                <img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/social/facebook.svg" alt="facebook" width="20" height="20">
           					</a>
           					<a href="https://www.linkedin.com/company/jam-agency/" target="_blank" aria-label="LinkedIn">
                                <img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/social/linkedin.svg" alt="linkedin" width="20" height="20">
           					</a>
           					<a href="tel:+972509913755" aria-label="WhatsApp">
                                <img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/social/whatsapp.svg" alt="whatsapp" width="20" height="20">
           					</a>
        				</div>
        				<a href="https://www.instagram.com/explore/tags/jammagency_design/?img_index=1" class="footer-instagram" target="_blank">jammagency_design#</a>
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
	<?php wp_footer(); ?>
</body>
</html>
