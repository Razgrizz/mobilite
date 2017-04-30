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
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
       // this.receivedEvent('deviceready');
    },

    ajouterAgenda : function (){
        event.preventDefault();
        console.log('ajouterAgenda');

        var success = function(message) { console.log("Success: " + JSON.stringify(message)); };
        var error = function(message) { console.log("Error: " + message); };

        var dateDebut = new Date(document.querySelector('input[name=debut]').value);

        // création de l'evenement dans le calendrier + ouverture du calandrier
        window.plugins.calendar.createEvent(document.querySelector('.resultsContainer h2').innerHTML,document.querySelector('input[name=search]').value,'',dateDebut, new Date(document.querySelector('input[name=fin]').value),success,error);
        window.plugins.calendar.openCalendar(new Date(document.querySelector('input[name=debut]').value), success, error);
    },


    sendSms: function() {

        // construction du contenu du sms
        var message = 'Logement : '+document.querySelector('.resultsContainer h2').innerHTML+'\ndu '+document.querySelector('input[name=debut]').value+'\nau '+document.querySelector('input[name=fin]').value;
        console.log("message= " + message);

        //CONFIGURATION
        var options = {
            replaceLineBreaks: true, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
            }
        };

        var success = function () { console.log('Message sent successfully'); };
        var error = function (e) { console.log('Message Failed:' + e); };

        // ouverture de l'application de sms
        sms.send('', message, options, success, error);
    }
};

app.initialize();