import ACTIONS from "../actions/";

const initialState = {
    resources: [],
    schedules: [],
    classes: [],
    courses: [],
    students: [],
    assignment: [],
    isAdded: false
}

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.TEACHER_ACTIONS.LOAD_DATA:
            state = action.payload;
            return state;
        case ACTIONS.TEACHER_ACTIONS.REPLACE_SCHEDULES:
            let replaceShedules = action.payload;
            state = { ...state, schedules: replaceShedules };
            return state;
        case ACTIONS.TEACHER_ACTIONS.ADD_CLASS:
            let newClass = action.payload;
            state = { ...state, classes: [...state.classes, newClass] };
            return state;
        case ACTIONS.TEACHER_ACTIONS.ADD_COURSE:
            let newCourse = action.payload;
            state = { ...state, courses: [...state.courses, newCourse] };
            return state;
        case ACTIONS.TEACHER_ACTIONS.ADD_STUDENT:
            let newStudent = action.payload;
            state = { ...state, courses: [...state.students, newStudent] };
            return state;
        case ACTIONS.TEACHER_ACTIONS.REPLACE_ASSIGNMENTS:
            let replaceAssignments = action.payload;
            state = { ...state, assignments: replaceAssignments };
            return state;
        default:
            return state;
    }
};

export default teacherReducer;
