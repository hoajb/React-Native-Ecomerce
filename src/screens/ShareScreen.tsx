import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ShareScreenProps } from '../navigation/MainNavigator';
import MyButton from '../common/Button';
import Share from 'react-native-share';
import { theme } from '../theme/color'

const ShareScreen = (props: ShareScreenProps) => {
    const [result, setResult] = React.useState<string>('');

    function getErrorString(error: any, defaultValue?: string | undefined) {
        let e = defaultValue || 'Something went wrong. Please try again';
        if (typeof error === 'string') {
            e = error;
        } else if (error && error.message) {
            e = error.message;
        } else if (error && error.props) {
            e = error.props;
        }
        return e;
    }

    const handleShare = async () => {
        setResult('')
        const shareOptions = {
            title: 'Share file',
            email: 'email@example.com',
            // social: Share.Social.EMAIL,
            failOnCancel: false,
            message: 'Message ABC - ECommerce App'
            // urls: [images.image1, images.image2],
        };

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log('Result =>', ShareResponse);
            setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            setResult('error: '.concat(getErrorString(error)));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ShareScreenProps</Text>
            <MyButton text={'Share'} onPress={handleShare} />
            <Text style={[
                styles.text, { textAlign: 'auto', margin: 10, backgroundColor: result === '' ? 'transparent' : theme.colors.info }]}>
                {result}
            </Text>
        </View>
    );
};

export { ShareScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
});
