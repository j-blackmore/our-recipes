import React, { createContext, useReducer } from 'react';

const ViewContext = createContext({});

const initState = {
    updateRecipes: false,
    modalView: '',
    prevView: '',
    recipe: null
};

const reducer = (state, action) => {
    const { updateRecipes } = action;
    const overrideUpdate = !updateRecipes ? { updateRecipes: false } : {};
    return { ...state, ...action, ...overrideUpdate };
};

export const ViewProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <ViewContext.Provider value={{ state, dispatch }}>
            {children}
        </ViewContext.Provider>
    );
};
export const ViewConsumer = ViewContext.Consumer;
export default ViewContext;
