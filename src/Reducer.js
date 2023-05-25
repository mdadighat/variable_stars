const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_STARS':
            return {
                ...state,
                stars: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
       //case 'ADD_POST':
       //     return {
        //        ...state,
        //        posts: state.posts.concat(action.payload)
        //    };
        default:
            return state;
    }
};

export default Reducer;