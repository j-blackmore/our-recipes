async function apiFetch(endpoint, { body, ...customConfig } = {}) {
    const config = {
        method: body ? 'POST' : 'GET',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        },
        ...customConfig
    };

    if (body && config.headers['Content-Type'] === 'application/json') {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, config);
    const result = await response.json();
    return response.ok ? result : Promise.reject(result);
}

const RECIPES_ENDPOINT = '/recipes';
const RECIPE_ENDPOINT = '/recipe';
const FILES_ENDPOINT = '/files';

const recipesAPI = {
    getRecipes: () => apiFetch(RECIPES_ENDPOINT),
    addRecipe: data => apiFetch(RECIPE_ENDPOINT, { body: data }),
    updateRecipe: (id, data) =>
        apiFetch(`${RECIPE_ENDPOINT}/${id}`, {
            body: data,
            method: 'PUT'
        }),
    deleteRecipe: id =>
        apiFetch(`${RECIPE_ENDPOINT}/${id}`, { method: 'DELETE' }),
    uploadImage: newImage =>
        apiFetch(`${FILES_ENDPOINT}/upload`, {
            body: newImage,
            headers: {}
        })
};

export default recipesAPI;
