import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  ScrollView,
  ActivityIndicator,
  Text,
  Alert,
  View
} from 'react-native';
import SearchForm from './SearchForm';
import ResultList from './ResultList';
import Detail from './Detail';

export default class reactProject extends Component {

  constructor(props) {
    super(props);

    // Etats
    this.state = {
      chargement : false,
      debut : '',
      fin : '',
      titre : '',
      image : '',
      dataSource : new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      afficheListe : false,
      afficheDetail : false
    }

    this.handleItem = this.handleItem.bind(this);
    this.searchForm = this.searchForm.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <SearchForm style={styles.searchForm} onSubmit={this.searchForm} />
          { this.state.chargement && <ActivityIndicator size="large" /> }
          { this.state.afficheListe && <ResultList style={styles.resultList} onSubmit={this.handleItem} dataSource={this.state.dataSource} /> }
          { this.state.afficheDetail && <Detail style={styles.detail} titre={this.state.titre} image={this.state.image} debut={this.state.debut} fin={this.state.fin} /> }
        </ScrollView>
      </View>
    );
  }

  handleItem(titre, image){
    this.setState({ titre:titre, image:image, afficheListe: false, afficheDetail : true});
  }

  searchForm(search, nombre, debut,fin){

    this.setState({ chargement:true, debut:debut, fin:fin}, function() {
        // Requetes vers Airbnb
        fetch('https://www.airbnb.fr/search/search_results/?location='+search+'&guests='+nombre+'&checkin='+debut+'&checkout='+fin)
        .then((response) => response.json())
        .then((responseJSON) => {
            
            // Cache le loader et affiche la liste
            this.setState({
                chargement:false,
                dataSource: this.state.dataSource.cloneWithRows(responseJSON.results_json.search_results),
                afficheListe : true
            });
        })
        .catch((error) => alert(error));
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    marginLeft:30,
    marginRight:30
  },
  scrollView: {
    flex:1
  },
  searchForm :{
    height:500
  },

});

AppRegistry.registerComponent('reactProject', () => reactProject);
