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

    show: function(text){
        alert("text: " + text);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    addLocalStorage: function() {
        //browser.executeScript({code: "alert('app');"});
    },

    onDeviceReady: function() {
        PushbotsPlugin.initialize("56d840131779593f0c8b4567", {"android":{"sender_id":"165604899689"}});
        /*/alert("asdf1")

        // First time registration
        // This will be called on token registration/refresh with Android and with every runtime with iOS
        Pushbots.on("registered", function(token){
            alert("Registration Id:" + token);
        });

        Pushbots.getRegistrationId(function(token){
            alert("Registration Id:" + token);
        });
    */
        /*browser = cordova.InAppBrowser.open("http://www.flatman.at/", "_blank", "location=no, EnableViewPortScale=no");
        browser.addEventListener('loadstop', function (){
            browser.executeScript({ code: "alert( 'hello' );" });
        });*/
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
