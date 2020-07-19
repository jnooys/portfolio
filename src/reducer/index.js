export const initialState = {
  originProject: [],
  sortedProject: [],
  sortCategory: [],
  sortYear: [],
  imagePath: 'https://rongchyo.cafe24.com/resources/images/thumbnail/',
  item: false,
  loading: true,
  activeCategory: false,
};

export const openModal = () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  html.style.overflowY = 'hidden';
  body.style.overflowY = 'scroll';
};

export const closeModal = () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  html.style.overflowY = '';
  body.style.overflowY = '';
};

const LOAD_DATA = 'LOAD_DATA';
const OPEN_ITEM = 'OPEN_ITEM';
const CLOSE_ITEM = 'CLOSE_ITEM';
const ACTIVE_CATEGORY = 'ACTIVE_CATEGORY';
const SORT_PROJECT = 'SORT_PROJECT';

export const loadData = ({ originProject, sortCategory, sortYear, loading }) => ({
  type: LOAD_DATA,
  originProject,
  sortCategory,
  sortYear,
  loading,
});

export const openItem = (item) => ({
  type: OPEN_ITEM,
  item,
});

export const closeItem = () => ({
  type: OPEN_ITEM,
});

export const toggleCategory = (active) => ({
  type: ACTIVE_CATEGORY,
  activeCategory: active,
});

export const sortProject = (project) => ({
  type: SORT_PROJECT,
  sortedProject: project,
});

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_DATA:
      return  {
        ...state,
        originProject: action.originProject,
        sortedProject: [...action.originProject],
        sortCategory: action.sortCategory,
        sortYear: action.sortYear,
        loading: action.loading,
      }
    case OPEN_ITEM: {
      return {
        ...state,
        item: action.item,
      }
    }
    case CLOSE_ITEM: {
      return {
        ...state,
        item: false,
      }
    }
    case ACTIVE_CATEGORY: {
      return {
        ...state,
        activeCategory: action.activeCategory,
      }
    }
    case SORT_PROJECT: {
      return {
        ...state,
        sortedProject: action.sortedProject,
      }
    }
    default:
      return state;
  }
};