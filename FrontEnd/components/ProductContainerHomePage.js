import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductContainerHomePage = () => {
  return (
    <View style={styles.blockContainer}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.container}>{children}</View>
    </View>
  )
}

export default ProductContainerHomePage

const styles = StyleSheet.create({
    blockContainer: {
        marginBottom: 20,
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      container: {
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
      },
});