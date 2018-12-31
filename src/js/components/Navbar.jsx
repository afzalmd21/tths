'use strict';

var React  = require('react');
var Reflux = require('reflux');

var Editor   = require('../components/Editor.jsx');
var Settings = require('../components/partials/Settings.jsx');
// var Login    = require('../components/partials/Login.jsx');

var AppActions = require('../actions/AppActions');
var AppStore   = require('../stores/AppStore');


var Navbar = React.createClass({

	getInitialState: function() {
		return { 
			alerts: []
		};
  },
	
	newAlert: function(type, e) {
		var name = 'alerts';
		var state = {};
		state[name] = this.state.alerts;
		if (this.state.alerts.length > 4)
			state[name].shift();
		state[name].push({level: 'warning', message: 'Sorry, database is not connected'});
		return this.setState(state);
	},
	
	removeAlert: function(type) {
		var name = 'alerts';
		var state = {};
		state[name] = [];
		this.state.alerts.forEach(function(elem, i) {
			if (type != i)
				state[name].push(elem);
		});
		return this.setState(state);
	},

	updateData: function() {
		return AppStore.fetchData(this.props);
	},

	saveData: function() {
		// return AppActions.saveData(this.props);
	},

	shareData: function() {
		return AppActions.shareData(this.props);
	},

	componentDidMount: function() {
		// Mousetrap.bind(['command+enter', 'ctrl+enter'], function(e) {
		// 	return this.updateData();
		// });

		// Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
		// 	return this.saveData();
		// });
	},

	render: function() {
		return (
			<div className="header">
				<a className="logo" href="/">
					<h1><b>LearnCoding</b></h1>
				</a>
				
				<ul className="inline actions">
					<li>
						<a href="javascript:void(0)" id="btnRun" onClick={this.updateData}>
							<i className="fa fa-play"></i>
							<span className="name">Run</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0)"
							onClick={this.newAlert}>
							<i className="fa fa-save"></i>
							<span className="name">Save</span>
						</a>
					</li>
					{/*
					<li>
						<a href="javascript:void(0)" id="btnSave" onClick={this.saveData}>
							<i className="fa fa-save"></i>
							<span className="name">Save</span>
						</a>
					</li>
					<li>
						<a href="javascript:void(0)" id="btnShare" onClick={this.shareData}>
							<i className="fa fa-share-alt"></i>
							<span className="name">Share</span>
						</a>
					</li>
					*/}
				</ul>

				<ul className="inline settings">
					<Settings {...this.props} />
					{/* Futur <Login /> */}
				</ul>

				<div id="alertBox" className="alerts">
					{this.state.alerts.map(function(elem, i) {
						return <div 
							key={i}
							onClick={this.removeAlert.bind(this, i)}
							className={'alert alert-' + elem.level}>
							{elem.message}
							<div className="alert__close"></div>
						</div>
					}, this)}
				</div>
			</div>
		);
	}

});


module.exports = Navbar;
