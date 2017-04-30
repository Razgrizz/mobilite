import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    Button,
    View,
    Alert,
    AppRegistry
} from 'react-native';
import DatePicker from 'react-native-datepicker';

class SearchForm extends Component {

    constructor(props) {
        super(props);

        // Etats
        this.state = {
            search : '',
            nombre : '',
            debut : '',
            fin : '',
        };

        // Fonction
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Rendu
    render() {
        return (
            <View style={styles.viewForm}>
                <View style={styles.viewText}>
                    <Text style={styles.text1}>Partir en week end ?</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.text2}>Cette app est faite pour vous !</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={styles.text3}>Rechercher une ville :</Text>
                    <TextInput
                        placeholder="paris"
                        onChangeText={(search) => this.setState({search})}
                    />
                    <Text style={styles.textNombre}>A combien voulez partir ?</Text>
                    <TextInput
                        placeholder='2'
                        keyboardType = 'numeric'
                        value = {this.state.nombre}
                        onChangeText={(nombre) => this.setState({nombre})}
                     />
                    <Text style={styles.textDate}>Date de départ :</Text>
                    <DatePicker
                        date={this.state.debut}
                        mode="date"
                        placeholder="Debut" 
                        format="YYYY-MM-DD"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36,
                            borderWidth : 0,
                            borderBottomWidth : 1,
                          }
                        }}
                        onDateChange={(date) => {this.setState({debut: date})}}
                    />
                    <Text style={styles.textDate}>Date de fin :</Text>
                    <DatePicker
                        date={this.state.fin}
                        mode="date"
                        placeholder="Fin" 
                        format="YYYY-MM-DD"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36,
                            borderWidth : 0,
                            borderBottomWidth : 1,
                          }
                        }}
                        onDateChange={(date) => {this.setState({fin: date})}}
                    />
                </View>
                <View style={styles.buttonForm}>
                    <Button  color="blue" title="Lancer la recherche" onPress={this.handleSubmit} />
                </View>
            </View>
        );
    }

    handleSubmit( event )
    {   
        event.preventDefault();

        if ( this.props.onSubmit ){

            if(this.state.search.length > 0){

                if (parseInt(this.state.nombre) > 0){

                    if(this.state.debut.length > 0){

                        if(this.state.fin.length > 0){

                            var aujourdhui = new Date();
                            var dateDebut = new Date(this.state.debut);
                            var dateFin = new Date(this.state.fin);

                            if(dateDebut.getTime() > aujourdhui.getTime()){

                                if(dateFin.getTime() > dateDebut.getTime()){
                                    this.props.onSubmit( this.state.search, this.state.nombre, this.state.debut, this.state.fin);
                                }else{
                                    alert('la date de fin doit être supérieure à la date de départ.');
                                }
                            }else{
                                alert('la date de départ doit être supérieure à la date d\'aujourd\'hui.');
                            }
                        }else{
                            alert('la date de fin est requis.');
                        }
                    }else{
                        alert('la date de debut est requis.');
                    }
                }else{
                    alert('le nombre de voyageurs est requis.');
                }
            }else{
                alert('le lieu est requis.');
            }
        }
    }
               
}

export default SearchForm;

// Design
const styles = StyleSheet.create({ 
    text1:{
        fontSize:25,
        textAlign:'center',
        paddingTop:10,
        paddingBottom:10
    },
    text2 :{
        fontSize:25,
        paddingTop:10,
        paddingBottom:10
    },
    textDate :{
        marginTop:10,
        marginBottom:10
    },
    buttonForm:{
        marginTop:30,
        marginBottom:20,
    }
});


