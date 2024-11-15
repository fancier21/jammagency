<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package jammagency
 */

get_header();
?>

	<div id="single" class="case">
	    <div class="wrap">

    		<?php
    		while ( have_posts() ) :
    			the_post();

    			get_template_part( 'template-parts/content', get_post_type() );

    			the_post_navigation(
    				array(
                        'prev_text' => '<img src="' . get_template_directory_uri() . '/img/arrow-left.svg" alt="Previous" width="29"> <span class="nav-subtitle">' . esc_html__( 'הקודם', 'jammagency' ) . '</span>',
                        'next_text' => '<span class="nav-subtitle">' . esc_html__( 'הבא', 'jammagency' ) . '</span> <img src="' . get_template_directory_uri() . '/img/arrow-right.svg" alt="Next" width="29">',
    				)
    			);

    			// If comments are open or we have at least one comment, load up the comment template.
    			// if ( comments_open() || get_comments_number() ) :
    			// 	comments_template();
    			// endif;

    		endwhile; // End of the loop.
    		?>

		</div><!-- wrap -->
	</div><!-- case -->

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

<?php
// get_sidebar();
get_footer();
