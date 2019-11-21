<?php
/**
 * Class AMP_Story_Post_Type
 *
 * @package AMP
 */

/**
 * Class AMP_Template_Post_Type
 */
class AMP_Template_Post_Type {
	/**
	 * The slug of the post type to store URLs that have AMP errors.
	 *
	 * @var string
	 */
	const POST_TYPE_SLUG = 'amp_template';

	/**
	 * The slug of the taxonomy to store URLs that have AMP errors.
	 *
	 * @var string
	 */
	const TAXONOMY_SLUG = 'amp_template_type';

	/**
	 * The option name where story settings are stored.
	 */
	const TEMPLATE_SLUG = 'select_template';


	/**
	 * The rewrite slug for this post type.
	 *
	 * @var string
	 */
	const REWRITE_SLUG = 'templates';

	/**
	 * AMP Stories script handle.
	 *
	 * @var string
	 */
	const AMP_STORIES_SCRIPT_HANDLE = 'amp-stories-templates';

	/**
	 * AMP Stories script handle.
	 *
	 * @var string
	 */
	const AMP_STORIES_STYLE_HANDLE = 'amp-stories-templates';

	/**
	 * AMP Stories script element.
	 *
	 * @var string
	 */
	const AMP_STORIES_SCRIPT_ELEMENT = 'amp-stories-id';



	/**
	 * Registers the post type to store URLs with validation errors.
	 *
	 * @return void
	 */
	public static function register() {
		if ( ! AMP_Options_Manager::is_stories_experience_enabled() ) {
			return;
		}

		register_post_type(
			self::POST_TYPE_SLUG,
			[
				'labels'       => [
					'name'                     => _x( 'Template', 'post type general name', 'amp' ),
					'singular_name'            => _x( 'Template', 'post type singular name', 'amp' ),
					'add_new'                  => _x( 'New', 'template', 'amp' ),
					'add_new_item'             => __( 'Add New Template', 'amp' ),
					'edit_item'                => __( 'Edit Template', 'amp' ),
					'new_item'                 => __( 'New Template', 'amp' ),
					'view_item'                => __( 'View Template', 'amp' ),
					'view_items'               => __( 'View Template', 'amp' ),
					'search_items'             => __( 'Search Template', 'amp' ),
					'not_found'                => __( 'No stories found.', 'amp' ),
					'not_found_in_trash'       => __( 'No stories found in Trash.', 'amp' ),
					'all_items'                => __( 'All Template', 'amp' ),
					'archives'                 => __( 'Template Archives', 'amp' ),
					'attributes'               => __( 'Template Attributes', 'amp' ),
					'insert_into_item'         => __( 'Insert into template', 'amp' ),
					'uploaded_to_this_item'    => __( 'Uploaded to this template', 'amp' ),
					'featured_image'           => __( 'Featured Image', 'amp' ),
					'set_featured_image'       => __( 'Set featured image', 'amp' ),
					'remove_featured_image'    => __( 'Remove featured image', 'amp' ),
					'use_featured_image'       => __( 'Use as featured image', 'amp' ),
					'filter_items_list'        => __( 'Filter stories list', 'amp' ),
					'items_list_navigation'    => __( 'Template list navigation', 'amp' ),
					'items_list'               => __( 'Template list', 'amp' ),
					'item_published'           => __( 'Template published.', 'amp' ),
					'item_published_privately' => __( 'Template published privately.', 'amp' ),
					'item_reverted_to_draft'   => __( 'Template reverted to draft.', 'amp' ),
					'item_scheduled'           => __( 'Template scheduled', 'amp' ),
					'item_updated'             => __( 'Template updated.', 'amp' ),
					'menu_name'                => _x( 'Template', 'admin menu', 'amp' ),
					'name_admin_bar'           => _x( 'Template', 'add new on admin bar', 'amp' ),
				],
				'menu_icon'    => 'dashicons-media-spreadsheet',
				'taxonomies'   => [
					'post_tag',
					'category',
				],
				'supports'     => [
					'title', // Used for amp-story[title].
					'author', // Used for the amp/amp-story-post-author block.
					'editor',
					'thumbnail', // Used for poster images.
					'amp',
					'revisions', // Without this, the REST API will return 404 for an autosave request.
					'custom-fields', // Used for global stories settings.
				],
				'rewrite'      => [
					'slug' => self::REWRITE_SLUG,
				],
				'public'       => true,
				'show_ui'      => true,
				'show_in_rest' => true,
			]
		);

		register_taxonomy(
			self::TAXONOMY_SLUG,
			self::POST_TYPE_SLUG,
			[
				'label'        => __( 'Type', 'amp' ),
				'public'       => false,
				'show_ui'      => true,
				'rewrite'      => false,
				'show_in_rest' => true,
				'hierarchical' => false,
			]
		);

		add_action( 'admin_menu', [ __CLASS__, 'add_page' ] );
		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'add_script' ] );

	}

	/**
	 * Add admin page.
	 */
	public static function add_page() {
		add_submenu_page( 'edit.php?post_type=amp_story', __( 'Select Template', 'amp' ), __( 'Select Template', 'amp' ), 'edit_posts', self::TEMPLATE_SLUG, [ __CLASS__, 'display_template' ] );
	}

	/**
	 * Template for admin page.
	 */
	public static function display_template() {
		printf( '<div id="%s"></div>', esc_attr( self::AMP_STORIES_SCRIPT_ELEMENT ) );
	}

	/**
	 * Add script only for custom admin page.
	 *
	 * @param string $hook Hook.
	 */
	public static function add_script( $hook ) {
		if ( 'amp_story_page_' . self::TEMPLATE_SLUG !== $hook ) {
			return;
		}

		$asset_file   = AMP__DIR__ . '/assets/js/' . self::AMP_STORIES_SCRIPT_HANDLE . '.asset.php';
		$asset        = require $asset_file;
		$dependencies = $asset['dependencies'];
		$version      = $asset['version'];

		wp_enqueue_script(
			self::AMP_STORIES_SCRIPT_HANDLE,
			amp_get_asset_url( 'js/' . self::AMP_STORIES_SCRIPT_HANDLE . '.js' ),
			$dependencies,
			$version,
			false
		);

		wp_localize_script(
			self::AMP_STORIES_SCRIPT_HANDLE,
			'ampStoriesTemplateSettings',
			[
				'id'       => self::AMP_STORIES_SCRIPT_ELEMENT,
				'settings' => [
					'testing' => 'bye',
					'api'     => '/wp/v2/' . self::POST_TYPE_SLUG,
					'api2'    => '/wp/v2/' . self::TAXONOMY_SLUG,
				],
			]
		);

		wp_enqueue_style(
			self::AMP_STORIES_STYLE_HANDLE,
			amp_get_asset_url( 'css/amp-stories-templates-compiled.css' ),
			[ 'wp-components' ],
			AMP__VERSION
		);

	}
}
