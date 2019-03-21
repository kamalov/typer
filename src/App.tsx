import * as React from 'react';
import {clamp} from 'lodash';
import './App.css';
import {EmpireVFb2Xml} from './EmpireVFb2Xml';

class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(EmpireVFb2Xml, "text/xml");
        const section = xmlDoc.getElementsByTagName("section")[0];
        const text = xmlDoc.getElementsByTagName("p")[2].textContent;
        console.log(text);
        this.state = {count: 0, text};
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);

    }

    getChars() {
        const {count, text} = this.state;
        const chars = text.split('').map((char, index) => {
            const color = index >= count ? 'white' : 'green';
            const backgroundColor = index === count ? 'red' : 'transparent';
            return <span key={index} style={{color, backgroundColor}}>{char}</span>;
        });

        return chars;
    }

    handleKeyDown = (event) => {
        const {text} = this.state;
        let {count} = this.state;

        const {keyCode, key} = event;

        if (keyCode === 8) {
            count--;
        } else {
            const c = key.toLowerCase();
            if (c === text[count].toLowerCase()) {
                count++;
            }
        }

        count = clamp(count, 0, text.length);
        this.setState({count});
    };

    render() {
        return (
            <div className="container">
                <div className="item">{this.getChars()}</div>
                {/*<div className="item">{text}</div>*/}
                {/*<div>{this.state.count}</div>*/}
            </div>
        );
        // return (
        //     <div className="App">
        //         <div className="App-header">
        //             <img src={logo} className="App-logo" alt="logo"/>
        //             <h2>Welcome to React</h2>
        //         </div>
        //         <p className="App-intro">
        //             To get started, edit <code>src/App.tsx</code> and save to reload.
        //         </p>
        //         <Hello name="TypeScript"/>
        //     </div>
        // );
    }
}

export {App};

