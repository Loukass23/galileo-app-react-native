import React, { Component } from 'react';
import './IssueCategoryScreen.css';
import { Camera, Permissions, } from 'expo';

class App extends Component {
    state = {
        issues: [
            { photo: null, type: "type3", date: null, user: "User3", id: 1, region: [] }
        ]
    }
    addIssue = (issue) => {
        //but this would update everyting all at once, so I don't know that it's all that efficient, especially at scale
        issue.id = Math.random();
        issue.date = new Date;
        issue.type = document.getElementById.value;
        let issues = [...this.state.issues, issue];
        this.setState({
            issues: issues
        })
    }
    deleteIssue = (id) => {
        //but this would update everyting all at once, so I don't know that it's all that efficient, especially at scale
        let issues = this.state.issues.filter(issue => {
            return issue.id !== id;
        });
        this.setState({
            issues: issues
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    componentDidMount() {
        console.log("App.js Component mounted");
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("App.js Component updated")
    }
    render() {
        return (
            <div className="App">
                <div className="d-flex justify-content-around">
                    <div className="reportTypeContainer d-flex flex-column justify-content-center border border-dark">
                        <div className="d-flex justify-content-center align-items-end">
                            <h4> What kind of problem? </h4>
                        </div>
                        <form className="py-3">
                            <div className="d-flex justify-content-around my-5">
                                <input className="reportTypeButton" type="button" id="type1" value="type1" onchange={this.addIssue}> 1 </input>
                                <input className="reportTypeButton" type="button" id="type2" value="type2" onchange={this.addIssue}> 2 </input>
                                <input className="reportTypeButton" type="button"id="type3" value="type3" onchange={this.addIssue}> 3 </input>
                            </div>
                            <div className="d-flex justify-content-around my-5">
                                <input className="reportTypeButton" type="button" id="type4" value="type4" onchange={this.addIssue}> 4 </input>
                                <input className="reportTypeButton" type="button" id="type5" value="type5" onchange={this.addIssue}> 5 </input>
                                <input className="reportTypeButton" type="button" id="type6" value="type6" onchange={this.addIssue}> 6 </input>
                            </div>
                            <div className="d-flex justify-content-around my-5">
                                <input className="reportTypeButton" type="button" id="type7" value="type7" onchange={this.addIssue}> 7 </input>
                                <input className="reportTypeButton" type="button" id="type8" value="type8" onchange={this.addIssue}> 8 </input>
                                <input className="reportTypeButton" type="button" id="type9" value="type9" onchange={this.addIssue}> 9 </input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
