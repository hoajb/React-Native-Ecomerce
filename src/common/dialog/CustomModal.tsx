import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import ModalController, { CustomModalRef } from './ModalController';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../theme/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export interface CustomModalProps {
    message?: string,
    title?: string,
    positiveButton?: string,
    negativeButton?: string,
    icon?: string,
    positiveButtonPressed?: ButtonCallback,
    negativeButtonPressed?: ButtonCallback,
}

type ButtonCallback = (modelRef: any) => void;

export const defaultModal: CustomModalProps = {
    title: 'E-Commerce App',
    message: 'Something went wrong',
    positiveButton: 'Ok',
    negativeButton: 'Cancel',
    icon: 'warning',
}

const CustomModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [customProps, setCustomProps] = useState(defaultModal);

    const modalRef = useRef<CustomModalRef>();

    useLayoutEffect(() => {
        ModalController.setModalRef(modalRef)
    }, [])

    useImperativeHandle(
        modalRef,
        () => ({
            show: (
                props: CustomModalProps
            ) => {
                setModalVisible(true);
                if (props) {
                    setCustomProps({ ...customProps, ...props })
                }
            },
            hide: () => {
                setModalVisible(false);
                setCustomProps(defaultModal);
            },
        }),
        []
    );

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                ModalController.hideModal();
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <FontAwesome style={{ padding: 10 }} name={customProps.icon ? customProps.icon : 'warning'} size={50} color={theme.colors.secondary} />
                    <Text style={styles.modalTitle}>{customProps.title}</Text>
                    {customProps.message ? <Text style={styles.modalMessage}>{customProps.message}</Text> : null}
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonNegative]}
                            onPress={() => {
                                ModalController.hideModal()
                                if (customProps.negativeButtonPressed)
                                    customProps.negativeButtonPressed(modalRef.current)
                            }}>
                            <Text style={styles.textStyle}>{customProps.negativeButton}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonPositive]}
                            onPress={() => {
                                ModalController.hideModal()
                                if (customProps.positiveButtonPressed)
                                    customProps.positiveButtonPressed(modalRef.current)
                            }}>
                            <Text style={styles.textStyle}>{customProps.positiveButton}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default forwardRef(CustomModal);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
    },
    buttonNegative: {
        backgroundColor: theme.colors.secondary,
    },
    buttonPositive: {
        backgroundColor: theme.colors.primary,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
});