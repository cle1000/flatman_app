/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var browser = null

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", this.onDeviceResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    onDeviceReady: function() {
        app.startApp();
    },

    onDeviceResume: function(){
        Pushbots.resetBadge();
        if (localStorage.getItem('reload') == 'true'){
            if (browser != null){
                browser = app.getBrowser()
            }
            localStorage.setItem('reload', 'false');
        }
    },

    startApp:function(){
        app.initPushbots()
        browser = app.getBrowser()
    },

    initPushbots: function (){
        //if (localStorage.getItem('device_token') == null || localStorage.getItem('device_token').length < 10){
        if (device.platform == 'Android'){
            localStorage.setItem('platform', 'android');
        }else{
            localStorage.setItem('platform', 'ios');
        }
        var Pushbots = PushbotsPlugin.initialize("56d840131779593f0c8b4567", {"android":{"sender_id":"165604899689"}});


        setTimeout(function(){
            Pushbots.getRegistrationId(function (token){
            localStorage.setItem('device_token', token);
            });
        }, 5000);
        //}
       
        // Should be called once the notification is clicked
        Pushbots.on("notification:clicked", function(data){
            localStorage.setItem('reload', 'true');
        });
    },

    getDeviceToken: function (){
        return localStorage.getItem('device_token');
    },

    getBrowser: function (){
        browser = cordova.InAppBrowser.open("http://www.flatman.at/#/newsfeed", "_blank", "location=no,zoom=no,toolbar=no");
        browser.addEventListener('exit', function (){
            navigator.app.exitApp();
        });
        browser.addEventListener('loadstop', function (){
            browser.executeScript({ code: "document.cookie='device_token="+app.getDeviceToken()+"'; document.cookie='platform="+localStorage.getItem('platform')+"'"});
        });
        return browser
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
