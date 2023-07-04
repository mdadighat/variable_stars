const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_STARS':
            return {
                ...state,
                stars: action.payload,
            };
        case 'SET_STAR_COUNT':
            return {
                ...state,
                starCount: action.payload
            };   
        case 'SET_DATETIME':
            return {
                ...state,              
                dateTime: action.payload
            };  
        case 'SET_LATLONG':
            return {
                ...state,            
                latLong: action.payload
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