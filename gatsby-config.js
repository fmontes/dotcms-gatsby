module.exports = {
    siteMetadata: {
        title: 'DotCMS Gatbsy Site',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-offline',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'gatsby-starter-default',
                short_name: 'starter',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-source-dotcms',
            options: {
                host: '48190c8c-42c4-46af-8d1a-0cd5db894797',
                credentials: {
                    email: 'admin@dotcms.com',
                    password: 'admin',
                },
            },
        },
    ],
}
