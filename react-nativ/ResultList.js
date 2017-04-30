
import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Share,
} from 'react-native';

class ResultList extends Component {

    constructor(props) {
        super(props);

        // Fonctions
        this.itemClick = this.itemClick.bind(this);
    }
    
    // Rendu
    render() {
        return (
            <View>
                <View>
                    <Text style={styles.textResultat}>Résultats</Text>
                </View>
                <ListView  
                    dataSource={this.props.dataSource}
                    renderRow={
                        (result) => {
                            return <ItemRenderer
                                        name={result.listing.name}
                                        image={result.listing.picture_url}
                                        onPress={this.itemClick}
                                    />
                        } 
                    } 
                />
            </View>
        );
    }

    itemClick(titre, image){

        if ( this.props.onSubmit ){

            this.props.onSubmit( titre, image);
        }
    }
}

class ItemRenderer extends Component {

    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={{flex:1, alignItems: 'stretch'}} onPress={this.handlePress}>
                    <Image 
                        source={{uri: this.props.image}} 
                        style={{ minHeight : 300}} />
                    <Text style={styles.textItem}>{this.props.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    handlePress(){

        if ( this.props.onPress ){

            this.props.onPress( this.props.name, this.props.image);
        }
    }
}

export default ResultList;

// Design
const styles = StyleSheet.create({
    textResultat:{
        textAlign:'center',
        fontSize:25,
        paddingBottom:10
    },
    textItem:{
        textAlign:'center',
        fontSize:19,
        paddingTop:10,
        paddingBottom:10
    }
});