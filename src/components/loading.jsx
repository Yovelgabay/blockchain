import { styles } from "../utils/styles"

export default function Loading() {
    return (
        <div class={styles.loading}>
            <img src = "/images/loading.gif" alt="loading..."/>
        </div>
    )
}
