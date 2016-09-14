/**
 * Created by anurag on 13/09/16.
 */

var saveInCache = (toDoItems, toDoId) => {
  localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  localStorage.setItem('toDoId', toDoId);
};

export default function todoReducer(state, action) {
  let toDoItems = state.toDoItems;
  let updatedToDoItems = JSON.parse(JSON.stringify(toDoItems)); // Immutability FTW :P
  let toDoId = state.toDoId;

  switch(action.type) {
    case 'ADD_TODO':
      updatedToDoItems.push({
        id: 'item-' + ++toDoId,
        text: action.value,
        done: false
      });

      saveInCache(updatedToDoItems, toDoId);
      break;

    case 'DELETE_TODO':
      const toDoItemIndex = updatedToDoItems.findIndex((item) => {return item.id === action.value});

      if (toDoItemIndex !== -1) {
        updatedToDoItems.splice(toDoItemIndex, 1);
      }

      saveInCache(updatedToDoItems, toDoId);
      break;

    case 'TOGGLE_TODO_DONE':
      const toDoItem = updatedToDoItems.find((item) => {return item.id === action.value});

      if (toDoItem) {
        toDoItem.done = !toDoItem.done;
      }

      saveInCache(updatedToDoItems, toDoId);
      break;

  }
  
  return { toDoItems: updatedToDoItems, toDoId };
}