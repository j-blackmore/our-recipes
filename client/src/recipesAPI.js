async function apiFetch(endpoint, { body, ...customConfig } = {}) {
    const config = {
        method: body ? 'POST' : 'GET',
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

const GET_RECIPES = '/recipes';
const ADD_RECIPE = '/recipes/add';
const DELETE_RECIPE = '/recipes/delete/';
const UPDATE_RECIPE = '/recipes/update/';
const UPLOAD_IMAGE = '/recipes/uploadImage';

const recipesApi = {
    getRecipes: () => apiFetch(GET_RECIPES),
    addRecipe: newRecipe => apiFetch(ADD_RECIPE, { body: newRecipe }),
    updateRecipe: (id, newRecipe) =>
        apiFetch(UPDATE_RECIPE + id, { body: newRecipe }),
    deleteRecipe: id => apiFetch(DELETE_RECIPE + id, { method: 'POST' }),
    uploadImage: newImage =>
        apiFetch(UPLOAD_IMAGE, {
            body: newImage,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
};

export default recipesApi;
