const initState = {
    COORDS: [
        { lat: 52.529815, lon: 13.395032 },
        { lat: 52.529915, lon: 13.395032 },
        { lat: 52.531015, lon: 13.395032 },
        { lat: 52.529015, lon: 13.395032 },
        { lat: 52.529015, lon: 13.395032 },
        { lat: 52.1, lon: 13 },
        { lat: 52.2, lon: 13 },
        { lat: 52.3, lon: 13 },
        { lat: 52.4852006, lon: 13.37 }
    ],
    ISSUES: [
        {
            category: "Trash",
            description: "with category now created one text",
            imageUrls: [
                "https://somecloud.com/img/3324/ssdfsd.jpeg",
                "https://somecloud.com/img/3324/12huyd.jpeg",
            ],
            location: {
                latitude: 52.4852006,
                longitude: 13.37,
            },
        },
        {
            category: "Pothole",
            description: "shitty pot hole",
            imageUrls: [
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdi-uploads-pod1.s3.amazonaws.com%2Fdepaulachevy%2Fuploads%2F2016%2F07%2FPothole-1024x768.jpg&imgrefurl=https%3A%2F%2Fwww.depaula.com%2Fpothole-damage-that-sinking-feeling-and-what-to-do-about-it%2F&docid=P2u2tdcU-ZumUM&tbnid=uO7iK-WSqb4X6M%3A&vet=10ahUKEwjxi-jb2fHiAhVpl4sKHejACV4QMwhAKAAwAA..i&w=1024&h=768&bih=695&biw=1366&q=pot%20hole&ved=0ahUKEwjxi-jb2fHiAhVpl4sKHejACV4QMwhAKAAwAA&iact=mrc&uact=8",
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fichef.bbci.co.uk%2Fnews%2F660%2Fcpsprodpb%2F129DB%2Fproduction%2F_104615267_9faf0b8c-02ef-4634-81b8-0d2d847439d0.jpg&imgrefurl=https%3A%2F%2Fwww.bbc.co.uk%2Fnews%2Fuk-46444109&docid=3_N_HWjDiQ9AIM&tbnid=7tV9frCKM3cRVM%3A&vet=10ahUKEwjxi-jb2fHiAhVpl4sKHejACV4QMwhGKAYwBg..i&w=660&h=453&bih=695&biw=1366&q=pot%20hole&ved=0ahUKEwjxi-jb2fHiAhVpl4sKHejACV4QMwhGKAYwBg&iact=mrc&uact=8",
            ],
            location: {
                latitude: 52.5,
                longitude: 13.4,
            },
        },
    ],
    ERR: null,
    INITIAL_POSITION: {
        latitude: 52.529015,
        longitude: 13.395032,
        latitudeDelta: 1,
        longitudeDelta: 1
    },
    RADIUS: 100
}

const issuesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_RADIUS':
            console.log('Radius set: ', action.payload)
            return {
                ...state,
                RADIUS: action.payload
            }
        case 'GET_ISSUES':
            console.log('Retrieved issues', action.payload)
            return {
                ...state,
                ISSUES: action.payload
            }
        case 'GET_ISSUES_ERROR':
            console.log('Unable to retrieve issues', action.payload)
            return {
                ...state,
                ERR: action.payload
            }
        default:
            return state
    }

}
export default issuesReducer