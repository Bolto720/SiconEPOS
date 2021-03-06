import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import GetItems from '../data_access/getitems';
import Basket from './Basket';
import CashOptions from './CashOptions';
import {connect} from 'react-redux';
import {createSalesOrder} from '../actions/salesOrder';
import PrintService from '../services/printService';
import {NativeRouter as Router, Route, Link} from 'react-router-native';
import CardPayment from './CardPayment';

class Pay extends Component {
  constructor(props) {
    super(props);

    this.printService = new PrintService();
    this.printService.connectPrinter(1);
  }

  printReceipt = () => {
    var total = 0.0;
    var line = '<C>Sicon Shop\n\n</C>';
    this.printService.printText(' ');
    this.props.basketItems.forEach((item) => {
      //Work out the padding
      total += Number(item.Price);
      line += `<C>${item.Code}: ${item.Price}</C>\n`;
    });

    line += `\n<C>Total: ${total}</C>\n\n`;

    this.printService.printText(line);

    this.printService.printAndCut('<C>Thank you for using Sicon EPOS</C>\n');
    this.printService.openCashDrawer();
  };

  render() {
    const items = [
      {
        id: 0,
        text: 'Cash',
        route: '/cash',
      },
      {
        id: 1,
        text: 'Card',
        route: '/card',
      },
      {
        id: 2,
        text: 'Sage Pay',
        route: '/sagepay',
      },
    ];

    return (
      <View style={styles.pay}>
        <Router>
          <View style={styles.payOptions}>
            <FlatList
              numColumns={1}
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <Link to={item.route}>
                  <TouchableOpacity style={styles.payOption}>
                    <Text style={styles.payOptionText}>{item.text}</Text>
                  </TouchableOpacity>
                </Link>
              )}
            />
          </View>
          <View style={styles.payInfo}>
            <View style={styles.payment}>
              <Route path="/cash" component={CashOptions} />
              <Route path="/card" component={CardPayment} />
              <Route path="/sagepay" component={CashOptions} />
            </View>
            <View style={styles.enter}>
              <TouchableOpacity
                onPress={() => {
                  this.printReceipt();
                  this.props.createSalesOrder('CASH01', this.props.basketItems);
                }}>
                <Text style={styles.enterText}>Process</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Router>
        <Basket></Basket>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketItems: state.stockItemReducer.basketItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSalesOrder: (account, items) =>
      dispatch(createSalesOrder(account, items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pay);

const styles = StyleSheet.create({
  pay: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    margin: 5,
  },
  payOptions: {
    flex: 1,
  },
  payInfo: {
    flex: 2,
  },
  payOption: {
    borderWidth: 1,
    margin: 5,
    width: 'auto',
    padding: 5,
  },
  payOptionText: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  enter: {
    height: 50,
    borderWidth: 1,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
  },
  enterText: {
    fontSize: 30,
    textAlign: 'center',
  },
  payment: {
    flex: 1,
  },
});
