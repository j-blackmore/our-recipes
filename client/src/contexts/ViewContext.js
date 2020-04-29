import React, { createContext, useReducer } from 'react';

const ViewContext = createContext({});

const initState = {
    modalView: 'none',
    prevView: 'none',
    recipe: null
};

const reducer = (state, action) => {
    const { modalView, prevView, recipe } = action;

    if (modalView === 'recipe') {
        return {
            ...state,
            modalView: modalView,
            prevView: prevView,
            recipe: recipe
        };
    } else {
        return { ...state, modalView: modalView, prevView: prevView };
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
