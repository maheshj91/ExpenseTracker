import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Input({label, style, textInputConfig, invalid}) {

    const inputStyles= [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMiltiline);
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return(
        <View style={[styles.container, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMiltiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});