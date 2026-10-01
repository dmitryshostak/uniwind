import type { InputAccessoryViewProps } from 'react-native'
import { View as RNView } from 'react-native'
import { copyComponentProperties } from '../utils'
import { generateDataSet } from './generateDataSet'
import { toRNWClassName } from './rnw'

// React Native Web implements InputAccessoryView (0.21.3+) as an unimplemented View stub, so this wraps View directly.
// Reading InputAccessoryView from the react-native root would load React Native Web's root index, which the Metro web
// resolver redirects back to this module while that index is still initializing.
export const InputAccessoryView = copyComponentProperties(RNView, (props: InputAccessoryViewProps) => {
    return (
        <RNView
            {...props}
            style={[toRNWClassName(props.className), props.style]}
            dataSet={generateDataSet(props)}
        />
    )
})

export default InputAccessoryView
