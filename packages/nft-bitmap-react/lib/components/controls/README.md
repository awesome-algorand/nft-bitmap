# Control Components Overview

These components are used to handle the state of the application. All modules share a similar
format.

Given a component named `Payment` the following exports should be available:

### TOOL_NAME

The ToolName of the component
```typescript
export const PAYMENT_TOOL_NAME: ToolName = 'payment';
```

### TOOL_TITLE

The english title of the component
```typescript
export const PAYMENT_TOOL_TITLE = 'Payment';
```


### Icon

Controls should have an icon that represents the control and should be a SVG.

```tsx
export function PaymentIcon() {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
          <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/>
      </svg>
  );
};
```

### IconButton

Controls should have an IconButton that is used to trigger the action. It should use the TOOL_TITLE

```tsx
export function PaymentIconButton(props: IconButtonProps) {
  return (
    <IconButton title={PAYMENT_TOOL_TITLE} {...props}>
      <PaymentIcon />
    </IconButton>
  );
}
```

### ControlView

An additional component that will be used for more advanced actions. It should use the TOOL_TITLE

```tsx
export function PaymentControlView({onPayment, ...props}: ControlProps & {onPayment: (txn:Transaction)=>void}) {
  return (
    <ControlView title={PAYMENT_TOOL_TITLE} {...props}>
      <div>
          <p>Payment information</p>
          <button onClick={onPayment}>Pay</button>
      </div>
    </ControlView>
  );
}
```
