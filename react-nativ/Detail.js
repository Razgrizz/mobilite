import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import CalendarManager from 'react-native-calendar-manager';
import Communications from 'react-native-communications';


class Detail extends Component {

    constructor(props) {
        super(props);

        this.agenda = this.agenda.bind(this);
        this.partager = this.partager.bind(this);
    }
  
    render() {
        return (
            <View>
                <View>
                    <Text style={styles.titre}>{this.props.titre}</Text>
                </View>
                <View style={styles.viewImage}>
                    <Image 
                        source={{uri: this.props.image}} 
                        style={{height:400}} />
                </View>
                <View style={styles.viewButton}>
                    <View style={styles.viewAgenda}>
                        <Button  color="blue" title="Agenda" onPress={this.agenda} />
                    </View>
                    <View style={styles.viewPartager}>
                        <Button  color="blue" title="Partager" onPress={this.partager} />
                    </View>
                </View>
            </View>
        );
    }

    agenda(){

        CalendarManager.addEvent({
          name: this.props.titre,
          location : '',
          startTime: new Date(this.props.debut).getTime(),
          endTime: new Date(this.props.fin).getTime(),
        });

    }

    partager(){

        dateDebut = new Date(this.props.debut);
        dateFin = new Date(this.props.fin);

        var moisDebut = String(dateDebut.getMonth() + 1);
        var jourDebut = String(dateDebut.getDate());
        var anneeDebut = String(dateDebut.getFullYear());
        var moisFin = String(dateFin.getMonth() + 1);
        var jourFin = String(dateFin.getDate());
        var anneeFin = String(dateFin.getFullYear());

        if (moisDebut.length < 2) 
        moisDebut = '0' + moisDebut;

        if (jourDebut.length < 2) 
        jourDebut = '0' + jourDebut;

        if (moisFin.length < 2) 
            moisFin = '0' + moisFin;

        if (jourFin.length < 2) 
        jourFin = '0' + jourFin;

        var dateDebutFinal = jourDebut+'/'+moisDebut+'/'+anneeDebut;
        var dateFinFinal = jourFin+'/'+moisFin+'/'+anneeFin;

        var text = 'Logement : '+this.props.titre+' du '+dateDebutFinal+' au '+dateFinFinal+'.';

        Communications.text(null,text);
    }

}

export default Detail;

const styles = StyleSheet.create({
    viewDetail :{
        height:700
    },
    viewTitle:{
        height:50
    },
    viewImage:{
        height:400
    },
    titre:{
        textAlign:'center',
        fontSize:19,
        paddingBottom:10,
        paddingTop:10
    },
    viewAgenda:{
        marginTop:30,
        marginBottom:30
    },
    viewPartager:{
        marginTop:30,
        marginBottom:30
    }

});