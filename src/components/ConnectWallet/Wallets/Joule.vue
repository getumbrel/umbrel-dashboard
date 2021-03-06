<template>
  <connection-details name="Joule (Chrome Extension)" requires="lnd">
    <step-list>
      <step>
        Install the <a href="https://chrome.google.com/webstore/detail/joule/aejmoogjdllanidlpfjmmmmimfaficio">Joule Chrome Extension</a>
      </step>
      <step>
        Click the extension icon
      </step>
      <step>
        Click <span class="font-weight-bold">Get started</span>
      </step>
      <step>
        Click <span class="font-weight-bold">Remote node</span>
      </step>
      <step>
         In the <span class="font-weight-bold">"Node URL"</span>, enter the following and click <span class="font-weight-bold">Connect</span>
         <input-copy class="my-1" :value="https://umbrel.local:8080" auto-width ></input-copy>
      </step>
      <step>
        Chrome will ask to allow access to send requests. Click <span class="font-weight-bold">Allow</span>
      </step>
      <step>
        It will say "Failed to connect to node," and give you a link. Click the link that says <span class="font-weight-bold">"clicking this link"</span>.
      </step>
      <step>
        A new tab will open. Click advanced, and ignore the certificate warning. A broken JSON response should show up in the tab after ignoring the cert warning.
      </step>
      <step>
        Return to the Joule tab and click <span class="font-weight-bold">Connect</span> once more. (Click allow for the Chrome permissions again, too)
      </step>
      <step>
        Click the link where it says <span class="font-weight-bold">"Have hex strings instead? Click here to switch."</span>
      </step>
      <step>
        <ul class="connect-wallet-substeps">
          <li class="connect-wallet-substep">
            In the <span class="font-weight-bold">"Admin macaroon"</span>, enter
            <input-copy class="my-1" :value="urls.lnd.adminMacaroonHex" auto-width ></input-copy>
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
        Confirm the information of your node and click <span class="font-weight-bold">Confirm</span>
      </step>
      <step>
        Enter the same strong password (for use during payment operations only) in both fields and click <span class="font-weight-bold">"Continue"</span>
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
