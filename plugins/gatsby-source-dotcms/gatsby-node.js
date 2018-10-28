const dotCMSApi = require('./dotcms-api');

exports.sourceNodes = ({ actions, createNodeId }, configOptions) => {
    const { createNode } = actions

    // Gatsby adds a configOption that's not needed for this plugin, delete it
    delete configOptions.plugins

    // Helper function that processes a contentlet to match Gatsby's node structure
    const processContentlet = contentlet => {
        const nodeId = createNodeId(`dotcms-${contentlet.contentType}-${contentlet.inode}`)
        const nodeContent = JSON.stringify(contentlet)

        const nodeData = {
            ...contentlet,
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `DotCMS${contentlet.contentType}`,
                content: nodeContent,
                contentDigest: JSON.stringify(contentlet),
            },
        }

        return nodeData
    }

    return (
        dotCMSApi.getContentlets(configOptions)
            .then(contentlets => {
                contentlets.forEach((contentlet) => {
                    const nodeData = processContentlet(contentlet)
                    createNode(nodeData)
                })
            })
    )
}
