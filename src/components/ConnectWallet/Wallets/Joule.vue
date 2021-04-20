<template>
  <connection-details name="Joule (Chrome Extension)" requires="lnd">
    <step-list>
      <step>
        Install the <a href="https://chrome.google.com/webstore/detail/joule/aejmoogjdllanidlpfjmmmmimfaficio">Joule Chrome Extension</a>.
      </step>
      <step>
        Open the extension by clicking its icon.
      </step>
      <step>
        Click <span class="font-weight-bold">"Get started"</span>.
      </step>
      <step>
        Click <span class="font-weight-bold">"Remote node"</span>.
      </step>
      <step>
         In the <span class="font-weight-bold">"Node URL"</span>, enter <input-copy class="my-1" value="https://umbrel.local:8080" auto-width></input-copy> and click <span class="font-weight-bold">"Connect"</span>.
      </step>
      <step>
        Chrome will ask to allow access to send requests. Click <span class="font-weight-bold">"Allow"</span>.
      </step>
      <step>
        It will say "Failed to connect to node", and give you a link. Open this link.
      </step>
      <step>
        A new tab will open. Click <span class="font-weight-bold">"Advanced"</span>, and ignore the certificate warning. A broken JSON response should show up in the tab.
      </step>
      <step>
        Return to the Joule tab and click <span class="font-weight-bold">"Connect"</span> once more.
      </step>
      <step>
        Click <span class="font-weight-bold">"Have hex strings instead? Click here to switch."</span>
      </step>
      <step>
        <ul class="connect-wallet-substeps">
          <li class="connect-wallet-substep">
            In the <span class="font-weight-bold">"Admin macaroon"</span>, enter
            <input-copy class="my-1" :value="urls.lnd.adminMacaroonHex" auto-width></input-copy>
          </li>
          <li class="connect-wallet-substep">
            In the <span class="font-weight-bold">"Readonly macaroon"</span>, enter
            <input-copy class="my-1" :value="urls.lnd.readonlyMacaroonHex" auto-width></input-copy>
          </li>
          <li class="connect-wallet-substep">
            Click <span class="font-weight-bold">"Continue"</span>.
          </li>
        </ul>
      </step>
      <step>
        Click <span class="font-weight-bold">"Confirm"</span>.
      </step>
      <step>
        Choose a strong password (used to validate payments) and click <span class="font-weight-bold">"Continue"</span>.
      </step>
      <step>
        Congratulations! You have successfully connected Joule to your Umbrel.
      </step>
    </step-list>
  </connection-details>
</template>

<script>
import ConnectionDetails from "@/components/ConnectWallet/ConnectionDetails";
import StepList from "@/components/ConnectWallet/StepList";
import Step from "@/components/ConnectWallet/Step";
import InputCopy from "@/components/Utility/InputCopy";

export default {
  props: {
    urls: Object
  },
  components: {
    ConnectionDetails,
    StepList,
    Step,
    InputCopy
  }
};
</script>

<style lang="scss" scoped></style>
