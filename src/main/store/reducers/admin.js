import ACTIONS from "../actions/";

const initialState = {
    classes: [],
    courses: [],
    teachers: [],
    students: [],
    admins: [],
    courseAssignings: [],
    schedules: [],
    isAdded: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADMIN_ACTIONS.LOAD_DATA:
            state = action.payload;
            return state;
        case ACTIONS.ADMIN_ACTIONS.ADD_CLASS:
            let newClass = action.payload;
            state = { ...state, classes: [...state.classes, newClass] };
            return state;
        case ACTIONS.ADMIN_ACTIONS.ADD_COURSE:
            let newCourse = action.payload;
            state = { ...state, courses: [...state.courses, newCourse] };
            return state;
        case ACTIONS.ADMIN_ACTIONS.ADD_TEACHER:
            let newTeacher = action.payload;
            state = { ...state, teachers: [...state.teachers, newTeacher] };
            return state;
        case ACTIONS.ADMIN_ACTIONS.ADD_STUDENT:
            let newStudent = action.payload;
            state = { ...state, students: [...state.students, newStudent] };
            return state;
        case ACTIONS.ADMIN_ACTIONS.ADD_ADMIN:
            let newAdmin = action.payload;
            state = { ...state, admins: [...state.admins, newAdmin] };
            return state;
        case ACTIONS.ADMIN_ACTIONS.ADD_COURSE_ASSIGNINGS:
            let newCourseAssigning = action.payload;
            state = { ...state, courseAssignings: [...state.courseAssignings, newCourseAssigning] };
            return state;
        case ACTIONS.ADMIN_ACTIONS.ADD_SCHEDULES:
            let newShedules = action.payload;
            state = { ...state, schedules: [...state.shedules, newShedules] };
            return state;
        case ACTIONS.ADMIN_ACTIONS.REPLACE_SCHEDULES:
            let replaceShedules = action.payload;
            state = { ...state, schedules: replaceShedules };
            return state;
        default:
            return state;
    }
};

export default adminReducer;