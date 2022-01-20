import React from "react";
import TestRenderer, {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', ()=> {
    test('status from props should be in the state', () => {
       const component = TestRenderer.create( <ProfileStatus status={'Hello world!'} /> );
        const instance = component.getInstance();
        expect (instance.state.status).toBe('Hello world!')
    });

    test('after create span should be displayed', () => {
        const component = create( <ProfileStatus status={'Hello world!'} /> );
         const root = component.root;
         const span = root.findByType("span")
         expect (span).not.toBeUndefined()
     });

     test(`after create input shouldn't be displayed`, () => {
        const component = create( <ProfileStatus status={'Hello world!'} /> );
         const root = component.root;
         expect (()=> {
             const input = root.findByType("input")
            }).toThrow()
     });

    test('after create span should contains correct status', () => {
        const component = create( <ProfileStatus status={'Hello world!'} /> );
         const root = component.root;
         const span = root.findByType("span")
         expect (span.props.children).toBe('Hello world!')
     });

     test('input should be displayed in editMode instead of span', () => {
        const component = create( <ProfileStatus status={'Hello world!'} /> );
         const root = component.root;
         const span = root.findByType("span")
         span.props.onDoubleClick();
         const input = root.findByType("input")
         expect (input.props.value).toBe('Hello world!')
     });

     test('callback should be called', () => {
         const mockCallback = jest.fn()
        const component = create( <ProfileStatus status={'Hello world!'} updateUserStatus={mockCallback} /> );
         const instance = component.getInstance();
         instance.deactivateEditMode()
         expect (mockCallback.mock.calls.length).toBe(1)
     });
})