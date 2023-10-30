import {View, Text, StyleSheet, Alert} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from '../UI/Button';
import {getFormattedDate} from "../../util/date";
import { GlobalStyles } from "../../constants/Styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            };
        });
    }

    function submitButtonHandler() {
        const expenseData = {
            amount: + inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (! amountIsValid && ! dateIsValid && ! descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values.');
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid }
                };
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    // function dateChangeHandler(date) {}
    // function descriptionChangeHandler(description) {}
    return (
        <View style={
            styles.container
        }>
            <Text style={
                styles.title
            }>Your Expense</Text>
            <View style={
                styles.inputRows
            }>
                <Input style={
                        styles.rowInput
                    }
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={
                        {
                            keyboardType: 'decimal-pad',
                            onChangeText: inputChangeHandler.bind(this, 'amount'),
                            value: inputs.amount.value
                        }
                    }/>
                <Input style={
                        styles.rowInput
                    }
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={
                        {
                            placeholder: 'YYYY-MM-DD',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'date'),
                            value: inputs.date.value
                        }
                    }/>
            </View>
            <Input label="Description"
            invalid={!inputs.description.isValid}
                textInputConfig={
                    {
                        multiline: true,
                        // autoCapitalize: 'none',
                        // autoCorrect: false, default is true.
                        onChangeText: inputChangeHandler.bind(this, 'description'),
                        value: inputs.description.value
                    }
                }/>
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
            <View style={
                styles.buttons
            }>
                <Button style={
                        styles.button
                    }
                    mode="flat"
                    onPress={onCancel}>Cancel</Button>
                <Button style={
                        styles.button
                    }
                    onPress={submitButtonHandler}>
                    {submitButtonLabel} </Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRows: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});
