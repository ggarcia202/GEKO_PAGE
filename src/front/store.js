const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem("geko-theme") || "light";
}

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "es";
  return window.localStorage.getItem("geko-language") || "es";
}

export const initialStore=()=>{
  return{
    message: null,
    language: getInitialLanguage(),
    theme: getInitialTheme(),
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case "set_language":
      if (typeof window !== "undefined") {
        window.localStorage.setItem("geko-language", action.payload);
      }
      return {
        ...store,
        language: action.payload
      };
    case "set_theme":
      if (typeof window !== "undefined") {
        window.localStorage.setItem("geko-theme", action.payload);
      }
      return {
        ...store,
        theme: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}
