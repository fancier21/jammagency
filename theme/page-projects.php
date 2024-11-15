<?php
/* Template Name: Projects page */
?>

<?php get_header(); ?>

    <div class="wrapM">
    	<div class="marqueeW bg1">
    		<div class="marqueeW-line line1">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    		</div>
    		<div class="marqueeW-line line2">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line1.svg" alt="" width="378" height="47">
    		</div>
    	</div>
    	<div class="marqueeW bg2">
    		<div class="marqueeW-line line3">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    		</div>
    		<div class="marqueeW-line line4">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    			<img loading="lazy" src="<?php echo get_template_directory_uri(); ?>/img/line2.svg" alt="" width="333" height="47">
    		</div>
    	</div><!-- .marqueeW -->
    </div><!-- .wrapM -->

	<section class="cases cases2">
		<div class="cases-grid">
    		<?php
                $args = array(
                    'post_type' => 'post',
                    'post_status' => 'publish',
                    // 'posts_per_page' => 6,
                    'category_name' => 'project'
                );
                $query = new WP_Query($args);
                if ($query->have_posts()) :
            ?>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <div class="cases-item">
                    <a href="<?php the_permalink(); ?>" class="cases-item-img">
                        <?php
                            if (has_post_thumbnail()) {
                                the_post_thumbnail('full', array(
                                    'loading' => 'lazy',
                                    'alt' => get_the_title(),
                                    'width' => 600,
                                    'height' => 420
                                ));
                            } else {
                                // If no featured image is set, you can use a placeholder image
                                // echo '<img loading="lazy" src="' . get_template_directory_uri() . '/media/1728542268_755_m.webp" alt="Inner Power" width="600" height="420">';
                            }
                        ?>
                    </a>
                    <div class="cases-item-cat">
                        <span>עיצוב לרשתות</span>
                        <span>קופירייטינג</span>
                    </div>
                    <h4 class="cases-item-title">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_title(); ?>
                        </a>
                    </h4>
                    <p class="cases-item-description"><?php echo get_the_excerpt(); ?></p>
                </div>
            <?php endwhile; wp_reset_postdata(); ?>
            <?php endif; ?>
		</div>									</div>
	</section> <!-- /.cases -->


	<section class="feedback2">
		<div class="wrap">
			<div class="feedback2-frame">
				<h2 class="feedback2-title">נדבר על האתר שלכם?</h2>
				<a href="#" class="btn js-modal-open" data-id="#js-feedback">
					<span class="btn-label">בואו נדבר</span>
					<span class="btn-icon">
						<svg width="35" height="19" viewBox="0 0 35 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M25.8899 1.25586L25.6899 1.45586L33.6089 9.38886H0.878906V9.67186H33.5519L25.6889 17.5459L25.8889 17.7459L33.9209 9.70286L33.8899 9.67186H33.9489L34.1189 9.50186L34.0059 9.38886L33.9209 9.30186L25.8899 1.25586Z" stroke="white"/>
						</svg>
					</span>
				</a>
			</div>
		</div> <!-- /.wrap -->
	</section> <!-- /.feedback2 -->

<?php get_footer(); ?>
