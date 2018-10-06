const fetch = require('node-fetch')

const getUrl = options =>
    `http://localhost:8080/api/content/render/false/query/+contentType:${options.variable}%20+(conhost:${options.host}%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc`

const getData = async options => {
    return fetch(getUrl(options))
        .then(data => data.json())
        .then(data => data.contentlets)
        .then(contentlets => {
            contentlets.forEach(contentlet => {
                contentlet.contentType = options.variable
            })
            return contentlets
        })
}

const getContentletsVariables = async (credentials) => {
    return fetch('http://localhost:8080/api/v1/contenttype?per_page=100', {
        headers: {
            DOTAUTH: Buffer.from(`${credentials.email}:${credentials.password}`).toString('base64'),
        },
    })
        .then(data => data.json())
        .then(contentTypes => contentTypes.entity.map(e => e.variable))
}

const getcontentTypesContentlets = async (configOptions) => {
    const contentlets = await getContentletsVariables(configOptions.credentials).then(variables => {
        return variables.map(async variable => {
            const data = await getData({
                variable: variable,
                host: configOptions.host
            })
            return data
        })
    })

    return Promise.all(contentlets)
}

exports.getContentlets = async (configOptions) => {
    return getcontentTypesContentlets(configOptions).then(contentTypesContentlets => {
        // Flatten nested array
        return [].concat.apply([], contentTypesContentlets)
    })
}
