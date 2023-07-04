const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_STARS':
            return {
                ...state,
                stars: action.payload,
                starCount: state.starCount
            };
        case 'SET_STAR_COUNT':
            return {
                ...state,
                stars: state.stars,
                starCount: action.payload
            };    
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};


export default Reducer;