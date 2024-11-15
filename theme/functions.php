<?php
/**
 * jammagency functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package jammagency
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function jammagency_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on jammagency, use a find and replace
		* to change 'jammagency' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'jammagency', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'jammagency' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'jammagency_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'jammagency_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function jammagency_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'jammagency_content_width', 640 );
}
add_action( 'after_setup_theme', 'jammagency_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function jammagency_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'jammagency' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'jammagency' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'jammagency_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function jammagency_scripts() {
	wp_enqueue_style( 'jammagency-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'jammagency-style', 'rtl', 'replace' );

	wp_enqueue_script( 'jammagency-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'jammagency_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}


/************************************************************************************
*                                                                                   *
*                                  CUSTOM CODE                                      *
*                                                                                   *
************************************************************************************/

/**
 * Add specific CSS classes based on the page
 *
 * Checks current page and adds corresponding CSS class to body
 * for page-specific styling.
 *
 * @param array $classes Array of existing body classes
 * @return array Modified array of body classes
 */
 function add_body_class($classes) {
    if (is_page('main')) {
        $classes[] = '';
    } elseif (is_page('policy')) {
        $classes[] = 'case-p';
    } elseif (is_page('accesability')) {
        $classes[] = 'case-p';
    } elseif (is_single()) {
        $classes[] = 'case-p';
    }
    return $classes;
 }
 add_filter('body_class', 'add_body_class');




function enqueue_app_script() {
    wp_enqueue_script('jammagency-app', get_template_directory_uri() . '/js/app.js', array(), null, true);

    // Add type="module" attribute
    add_filter('script_loader_tag', function($tag, $handle, $src) {
        if ('jammagency-app' === $handle) {
            return '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }, 10, 3);
}
add_action('wp_enqueue_scripts', 'enqueue_app_script');

function enqueue_feedback_form_script() {
    wp_enqueue_script('feedback-form-ajax', get_template_directory_uri() . '/js/feedback-form.js', array(), null, true);
    wp_localize_script('feedback-form-ajax', 'feedbackFormAjax', array(
        'ajax_url' => admin_url('admin-ajax.php')
    ));

    // Add type="module" attribute
    add_filter('script_loader_tag', function($tag, $handle, $src) {
        if ('feedback-form-ajax' === $handle) {
            return '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }, 10, 3);
}
add_action('wp_enqueue_scripts', 'enqueue_feedback_form_script');


function handle_feedback_form() {
    // Verify the nonce for security
    if (!isset($_POST['feedback_nonce']) || !wp_verify_nonce($_POST['feedback_nonce'], 'feedback_form_nonce')) {
        wp_send_json_error(['message' => 'Invalid nonce']);
        wp_die();
    }

    // Check for honeypot field (spam protection)
    if (isset($_POST['honeypot']) && !empty($_POST['honeypot'])) {
        wp_send_json_error(['message' => 'Spam detected']);
        wp_die();
    }

    // Validate and sanitize the form data
    $name = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field($_POST['message']) : '';

    if ( empty($name) || empty($phone) || empty($email) || empty($message) ) {
           wp_send_json_error(['message' => 'All fields are required.']);
       }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email address.';
        wp_die();
    }

    // The email recipient (change this to your email)
    $to = get_option('admin_email'); // or your own email
    // $to = 'fancier@proton.me';
    $subject = "Feedback from $name";

    // The email content (HTML)
    $email_content = '<strong>Name:</strong> ' . esc_html($name) . '<br>';
    $email_content = '<strong>Phone:</strong> ' . esc_html($phone) . '<br>';
    $email_content .= '<strong>Email:</strong> ' . esc_html($email) . '<br>';
    $email_content .= '<strong>Message:</strong><br>' . nl2br(esc_html($message));

    // Email headers for HTML content
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . esc_html($name) . ' <' . esc_html($email) . '>',
        'Reply-To: ' . esc_html($email)
    );

    $mail_sent = wp_mail($to, $subject, $email_content, $headers);

    // Send the email
    if ($mail_sent) {
        wp_send_json_success(['message' => 'Your submission was successful!']);
    } else {
        wp_send_json_error(['message' => 'Submission failed. Please try again.']);
    }

    wp_die(); // Required to terminate properly
}

add_action('wp_ajax_send_feedback', 'handle_feedback_form'); // For logged-in users
add_action('wp_ajax_nopriv_send_feedback', 'handle_feedback_form'); // For non-logged-in users
