
const { paymentMethodsMap } = require('../constants');

exports.getPaymentMethod = (paymentMethod) => {
    const paymentMethods = Object.keys(paymentMethodsMap)
    .map(key => ({
        value: key,
        label: paymentMethodsMap[key],
        isSelected: paymentMethod == key,
    }));

    return paymentMethods
}