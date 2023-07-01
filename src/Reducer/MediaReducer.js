export const ACTIONS = {
    INITIALPOSTS:"initialposts",
}

export function MediaReducer(state, action){
    switch(action.type){
        
        default: {
            throw new Error("Unknown action " + action.type);
          }

    }
}