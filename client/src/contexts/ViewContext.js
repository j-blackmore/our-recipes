import React, { createContext, useReducer } from 'react';

const ViewContext = createContext({});

const initState = {
    modalView: 'none',
    recipe: null
};

const reducer = (state, action) => {
    const { modalView, recipe } = action;

    if (modalView === 'recipe') {
        return { ...state, modalView: modalView, recipe: recipe };
    } else {
        return { ...state, modalView: modalView };
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
