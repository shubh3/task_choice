export default function ConditionalRenderer(props: any) {
    const { children, condition } = props;

    return (
        <>
            {condition?.()
                ?
                <>{children} </>
                : null}
        </>
    )
}
