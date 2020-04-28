import React, { createContext, useReducer } from 'react';

const ViewContext = createContext({});

const initState = {
    view: 'grid',
    recipe: null
};

const reducer = (state, action) => {
    const { view, recipe } = action;
    if (view === 'grid') {
        return { ...state, view: view };
    } else if (view === 'item') {
        return { ...state, view: view, recipe: recipe };
    }
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
