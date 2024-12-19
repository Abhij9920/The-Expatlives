(function() {
    window.WPD = "undefined" !== typeof window.WPD ? window.WPD : {};
    window.WPD.ajaxsearchlite = new function() {
        this.prevState = null;
        this.firstIteration = !0;
        this.helpers = {};
        this.plugin = {};
        this.addons = {
            addons: [],
            add: function(d) {
                -1 == this.addons.indexOf(d) && (d = this.addons.push(d),
                this.addons[d - 1].init())
            },
            remove: function(d) {
                this.addons.filter(function(b) {
                    return b.name == d ? ("undefined" != typeof b.destroy && b.destroy(),
                    !1) : !0
                })
            }
        }
    }
}
)();
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        setFilterStateInput: function(a) {
            let c = this;
            "undefined" == typeof a && (a = 65);
            let f = function() {
                JSON.stringify(c.originalFormData) != JSON.stringify(b.formData(d("form", c.n("searchsettings")))) ? c.n("searchsettings").find("input[name=filters_initial]").val(0) : c.n("searchsettings").find("input[name=filters_initial]").val(1)
            };
            0 == a ? f() : setTimeout(function() {
                f()
            }, a)
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        liveLoad: function(a, c, f, e) {
            function l(h) {
                h = b.Hooks.applyFilters("asl/live_load/raw_data", h, g);
                var n = new DOMParser;
                let p = n.parseFromString(h, "text/html")
                  , q = d(p);
                g.o.statistics && g.stat_addKeyword(g.o.id, g.n("text").val());
                "" != h && 0 < q.length && 0 < q.find(a).length && (h = h.replace(/&asl_force_reset_pagination=1/gmi, ""),
                h = h.replace(/%26asl_force_reset_pagination%3D1/gmi, ""),
                h = h.replace(/&#038;asl_force_reset_pagination=1/gmi, ""),
                b.isSafari() && (h = h.replace(/srcset/gmi, "nosrcset")),
                h = b.Hooks.applyFilters("asl/live_load/html", h, g.o.id, g.o.iid),
                h = b.wp_hooks_apply_filters("asl/live_load/html", h, g.o.id, g.o.iid),
                q = d(n.parseFromString(h, "text/html")),
                n = q.find(a).get(0),
                n = b.Hooks.applyFilters("asl/live_load/replacement_node", n, g, k.get(0), h),
                null != n && k.get(0).parentNode.replaceChild(n, k.get(0)),
                k = d(a).first(),
                f && (document.title = p.title,
                history.pushState({}, null, c)),
                d(a).first().find(".woocommerce-ordering").on("change", "select.orderby", function() {
                    d(this).closest("form").trigger("submit")
                }),
                g.addHighlightString(d(a).find("a")),
                b.Hooks.applyFilters("asl/live_load/finished", c, g, a, k.get(0)),
                ASL.initialize(),
                g.lastSuccesfulSearch = d("form", g.n("searchsettings")).serialize() + g.n("text").val().trim(),
                g.lastSearchData = h);
                g.n("s").trigger("asl_search_end", [g.o.id, g.o.iid, g.n("text").val(), h], !0, !0);
                let r, t;
                null == (t = (r = g).gaEvent) || t.call(r, "search_end", {
                    results_count: "unknown"
                });
                let u, v;
                null == (v = (u = g).gaPageview) || v.call(u, g.n("text").val());
                g.hideLoader();
                k.css("opacity", 1);
                g.searching = !1;
                "" != g.n("text").val() && g.n("proclose").css({
                    display: "block"
                })
            }
            if ("body" == a || "html" == a)
                return console.log("Ajax Search Pro: Do not use html or body as the live loader selector."),
                !1;
            "" == ASL.pageHTML && "undefined" === typeof ASL._ajax_page_html && (ASL._ajax_page_html = !0,
            d.fn.ajax({
                url: location.href,
                method: "GET",
                success: function(h) {
                    ASL.pageHTML = h
                },
                dataType: "html"
            }));
            f = "undefined" == typeof f ? !0 : f;
            e = "undefined" == typeof e ? !1 : e;
            let m = ".search-content #content #Content div[role=main] main[role=main] div.theme-content div.td-ss-main-content main.l-content #primary".split(" ");
            "#main" != a && m.unshift("#main");
            if (1 > d(a).length && (m.forEach(function(h) {
                if (0 < d(h).length)
                    return a = h,
                    !1
            }),
            1 > d(a).length))
                return console.log("Ajax Search Lite: The live search selector does not exist on the page."),
                !1;
            a = b.Hooks.applyFilters("asl/live_load/selector", a, this);
            let k = d(a).first()
              , g = this;
            g.searchAbort();
            k.css("opacity", .4);
            b.Hooks.applyFilters("asl/live_load/start", c, g, a, k.get(0));
            e || 1 != g.n("searchsettings").find("input[name=filters_initial]").val() || "" != g.n("text").val() ? (g.searching = !0,
            g.post = d.fn.ajax({
                url: c,
                method: "GET",
                success: function(h) {
                    l(h)
                },
                dataType: "html",
                fail: function(h) {
                    k.css("opacity", 1);
                    h.aborted || (k.html("This request has failed. Please check your connection."),
                    g.hideLoader(),
                    g.searching = !1,
                    g.n("proclose").css({
                        display: "block"
                    }))
                }
            })) : window.WPD.intervalUntilExecute(function() {
                l(ASL.pageHTML)
            }, function() {
                return "" != ASL.pageHTML
            })
        },
        getCurrentLiveURL: function() {
            var a = "asl_ls=" + b.nicePhrase(this.n("text").val());
            let c = "&"
              , f = window.location.href;
            f = -1 < f.indexOf("asl_ls=") ? f.slice(0, f.indexOf("asl_ls=")) : f;
            f = -1 < f.indexOf("asl_ls&") ? f.slice(0, f.indexOf("asl_ls&")) : f;
            f = -1 < f.indexOf("p_asid=") ? f.slice(0, f.indexOf("p_asid=")) : f;
            f = -1 < f.indexOf("asl_") ? f.slice(0, f.indexOf("asl_")) : f;
            -1 === f.indexOf("?") && (c = "?");
            a = f + c + a + "&asl_active=1&asl_force_reset_pagination=1&p_asid=" + this.o.id + "&p_asl_data=1&" + d("form", this.n("searchsettings")).serialize();
            return a = a.replace("?&", "?")
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        showLoader: function() {
            this.n("proloading").css({
                display: "block"
            })
        },
        hideLoader: function() {
            this.n("proloading").css({
                display: "none"
            });
            this.n("results").css("display", "")
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        loadASLFonts: function() {
            !1 !== ASL.font_url && ((new FontFace("aslsicons2","url(" + ASL.font_url + ")",{
                style: "normal",
                weight: "normal",
                "font-display": "swap"
            })).load().then(function(b) {
                document.fonts.add(b)
            }).catch(function(b) {}),
            ASL.font_url = !1)
        },
        updateHref: function() {
            if (this.o.trigger.update_href && !this.usingLiveLoader) {
                window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""));
                let b = this.getStateURL() + (this.resultsOpened ? "&asl_s=" : "&asl_ls=") + this.n("text").val();
                history.replaceState("", "", b.replace(location.origin, ""))
            }
        },
        fixClonedSelf: function() {
            let b = this.o.iid
              , a = this.o.rid;
            for (; !ASL.instances.set(this) && !(++this.o.iid,
            50 < this.o.iid); )
                ;
            b != this.o.iid && (this.o.rid = this.o.id + "_" + this.o.iid,
            this.n("search").get(0).id = "ajaxsearchlite" + this.o.rid,
            this.n("search").removeClass("asl_m_" + a).addClass("asl_m_" + this.o.rid).data("instance", this.o.iid),
            this.n("searchsettings").get(0).id = this.n("searchsettings").get(0).id.replace("settings" + a, "settings" + this.o.rid),
            this.n("searchsettings").hasClass("asl_s_" + a) ? this.n("searchsettings").removeClass("asl_s_" + a).addClass("asl_s_" + this.o.rid).data("instance", this.o.iid) : this.n("searchsettings").removeClass("asl_sb_" + a).addClass("asl_sb_" + this.o.rid).data("instance", this.o.iid),
            this.n("resultsDiv").get(0).id = this.n("resultsDiv").get(0).id.replace("prores" + a, "prores" + this.o.rid),
            this.n("resultsDiv").removeClass("asl_r_" + a).addClass("asl_r_" + this.o.rid).data("instance", this.o.iid),
            this.n("container").find(".asl_init_data").data("instance", this.o.iid),
            this.n("container").find(".asl_init_data").get(0).id = this.n("container").find(".asl_init_data").get(0).id.replace("asl_init_id_" + a, "asl_init_id_" + this.o.rid),
            this.n("prosettings").data("opened", 0))
        },
        destroy: function() {
            let b = this;
            Object.keys(b.nodes).forEach(function(h) {
                let n, p;
                null == (p = (n = b.nodes[h]).off) || p.call(n)
            });
            let a, c;
            null == (c = (a = b.n("searchsettings")).remove) || c.call(a);
            let f, e;
            null == (e = (f = b.n("resultsDiv")).remove) || e.call(f);
            let l, m;
            null == (m = (l = b.n("search")).remove) || m.call(l);
            let k, g;
            null == (g = (k = b.n("container")).remove) || g.call(k);
            b.documentEventHandlers.forEach(function(h) {
                d(h.node).off(h.event, h.handler)
            })
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        isRedirectToFirstResult: function() {
            return (0 < d(".asl_res_url", this.n("resultsDiv")).length || 0 < d(".asl_es_" + this.o.id + " a").length || this.o.resPage.useAjax && 0 < d(this.o.resPage.selector + "a").length) && (1 == this.o.redirectOnClick && "click" == this.ktype && "first_result" == this.o.trigger.click || 1 == this.o.redirectOnEnter && ("input" == this.ktype || "keyup" == this.ktype) && 13 == this.keycode && "first_result" == this.o.trigger.return)
        },
        doRedirectToFirstResult: function() {
            let a, c;
            a = "click" == this.ktype ? this.o.trigger.click_location : this.o.trigger.return_location;
            0 < d(".asl_res_url", this.n("resultsDiv")).length ? c = d(d(".asl_res_url", this.n("resultsDiv")).get(0)).attr("href") : 0 < d(".asl_es_" + this.o.id + " a").length ? c = d(d(".asl_es_" + this.o.id + " a").get(0)).attr("href") : this.o.resPage.useAjax && 0 < d(this.o.resPage.selector + "a").length && (c = d(d(this.o.resPage.selector + "a").get(0)).attr("href"));
            "" != c && ("same" == a ? location.href = c : b.openInNewTab(c),
            this.hideLoader(),
            this.hideResults());
            return !1
        },
        doRedirectToResults: function(a) {
            let c;
            c = "click" == a ? this.o.trigger.click_location : this.o.trigger.return_location;
            a = this.getRedirectURL(a);
            if (this.o.overridewpdefault) {
                if (1 == this.o.resPage.useAjax)
                    return this.hideResults(),
                    this.liveLoad(this.o.resPage.selector, a),
                    this.showLoader(),
                    0 == this.o.blocking && this.hideSettings(),
                    !1;
                "post" == this.o.override_method ? b.submitToUrl(a, "post", {
                    asl_active: 1,
                    p_asl_data: d("form", this.n("searchsettings")).serialize()
                }, c) : "same" == c ? location.href = a : b.openInNewTab(a)
            } else
                b.submitToUrl(a, "post", {
                    np_asl_data: d("form", this.n("searchsettings")).serialize()
                }, c);
            this.n("proloading").css("display", "none");
            this.hideLoader();
            this.hideResults();
            this.searchAbort()
        },
        getRedirectURL: function(a) {
            a = "click" == ("undefined" !== typeof a ? a : "enter") ? this.o.trigger.click : this.o.trigger.return;
            "results_page" == a || "ajax_search" == a ? a = "?s=" + b.nicePhrase(this.n("text").val()) : "woo_results_page" == a ? a = "?post_type=product&s=" + b.nicePhrase(this.n("text").val()) : (a = this.o.trigger.redirect_url,
            a = a.replace(/{phrase}/g, b.nicePhrase(this.n("text").val())));
            1 < this.o.homeurl.indexOf("?") && 0 === a.indexOf("?") && (a = a.replace("?", "&"));
            if (this.o.overridewpdefault && "post" != this.o.override_method) {
                let c = "&";
                -1 === this.o.homeurl.indexOf("?") && -1 === a.indexOf("?") && (c = "?");
                a = a + c + "asl_active=1&p_asl_data=1&" + d("form", this.n("searchsettings")).serialize();
                a = this.o.homeurl + a
            } else
                a = this.o.homeurl + a;
            a = a.replace("https://", "https:///");
            a = a.replace("http://", "http:///");
            a = a.replace(/\/\//g, "/");
            a = b.Hooks.applyFilters("asl/redirect/url", a, this.o.id, this.o.iid);
            return a = b.wp_hooks_apply_filters("asl/redirect/url", a, this.o.id, this.o.iid)
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        showResults: function() {
            this.initResults();
            this.createVerticalScroll();
            this.showVerticalResults();
            this.hideLoader();
            this.n("proclose").css({
                display: "block"
            });
            null != this.n("showmore") && (0 < this.n("items").length ? this.n("showmore").css({
                display: "block"
            }) : this.n("showmore").css({
                display: "none"
            }));
            "undefined" != typeof WPD.lazy && setTimeout(function() {
                WPD.lazy(".asl_lazy")
            }, 100);
            this.resultsOpened = !0
        },
        hideResults: function(a) {
            let c = this;
            a = "undefined" == typeof a ? !0 : a;
            if (!c.resultsOpened)
                return !1;
            c.n("resultsDiv").removeClass(c.resAnim.showClass).addClass(c.resAnim.hideClass);
            setTimeout(function() {
                c.n("resultsDiv").css(c.resAnim.hideCSS)
            }, c.resAnim.duration);
            c.n("proclose").css({
                display: "none"
            });
            b.isMobile() && a && document.activeElement.blur();
            c.resultsOpened = !1;
            c.n("s").trigger("asl_results_hide", [c.o.id, c.o.iid], !0, !0)
        },
        showResultsBox: function() {
            this.n("s").trigger("asl_results_show", [this.o.id, this.o.iid], !0, !0);
            this.n("resultsDiv").css({
                display: "block",
                height: "auto"
            });
            this.n("resultsDiv").css(this.resAnim.showCSS);
            this.n("resultsDiv").removeClass(this.resAnim.hideClass).addClass(this.resAnim.showClass);
            this.fixResultsPosition(!0)
        },
        addHighlightString: function(a) {
            let c = this
              , f = c.n("text").val().replace(/["']/g, "");
            a = "undefined" == typeof a ? c.n("items").find("a.asl_res_url") : a;
            1 == c.o.singleHighlight && "" != f && 0 < a.length && a.forEach(function() {
                try {
                    const e = new URL(d(this).attr("href"));
                    e.searchParams.set("asl_highlight", f);
                    e.searchParams.set("p_asid", c.o.id);
                    d(this).attr("href", e.href)
                } catch (e) {}
            })
        },
        scrollToResults: function() {
            var a = Math.floor(.1 * window.innerHeight);
            if (this.resultsOpened && 1 == this.o.scrollToResults.enabled && !this.n("resultsDiv").inViewPort(a)) {
                a = "hover" == this.o.resultsposition ? this.n("probox").offset().top - 20 : this.n("resultsDiv").offset().top - 20;
                a += this.o.scrollToResults.offset;
                var c = d("#wpadminbar");
                0 < c.length && (a -= c.height());
                window.scrollTo({
                    top: 0 > a ? 0 : a,
                    behavior: "smooth"
                })
            }
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        createVerticalScroll: function() {}
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        searchAbort: function() {
            null != this.post && this.post.abort()
        },
        searchWithCheck: function(a) {
            let c = this;
            "undefined" == typeof a && (a = 50);
            c.n("text").val().length < c.o.charcount || (c.searchAbort(),
            clearTimeout(c.timeouts.searchWithCheck),
            c.timeouts.searchWithCheck = setTimeout(function() {
                c.search()
            }, a))
        },
        search: function() {
            let a = this;
            if (!(a.n("text").val().length < a.o.charcount)) {
                a.searching = !0;
                a.n("proloading").css({
                    display: "block"
                });
                a.n("proclose").css({
                    display: "none"
                });
                var c = {
                    action: "ajaxsearchlite_search",
                    aslp: a.n("text").val(),
                    asid: a.o.id,
                    options: d("form", a.n("searchsettings")).serialize()
                };
                c = b.Hooks.applyFilters("asl/search/data", c);
                c = b.wp_hooks_apply_filters("asl/search/data", c);
                if (JSON.stringify(c) === JSON.stringify(a.lastSearchData))
                    return a.resultsOpened || a.showResults(),
                    a.hideLoader(),
                    a.isRedirectToFirstResult() && a.doRedirectToFirstResult(),
                    !1;
                var f;
                null == (f = a.gaEvent) || f.call(a, "search_start");
                0 < d(".asl_es_" + a.o.id).length ? a.liveLoad(".asl_es_" + a.o.id, a.getCurrentLiveURL(), !1) : a.o.resPage.useAjax ? a.liveLoad(a.o.resPage.selector, a.getRedirectURL()) : a.post = d.fn.ajax({
                    url: ASL.ajaxurl,
                    method: "POST",
                    data: c,
                    success: function(e) {
                        e = e.replace(/^\s*[\r\n]/gm, "");
                        e = e.match(/___ASLSTART___(.*[\s\S]*)___ASLEND___/)[1];
                        e = b.Hooks.applyFilters("asl/search/html", e);
                        e = b.wp_hooks_apply_filters("asl/search/html", e);
                        a.n("resdrg").html("");
                        a.n("resdrg").html(e);
                        d(".asl_keyword", a.n("resdrg")).on("click", function() {
                            a.n("text").val(d(this).html());
                            d("input.orig", a.n("container")).val(d(this).html()).trigger("keydown");
                            d("form", a.n("container")).trigger("submit", "ajax");
                            a.search()
                        });
                        a.nodes.items = d(".item", a.n("resultsDiv"));
                        a.addHighlightString();
                        let l;
                        null == (l = a.gaEvent) || l.call(a, "search_end", {
                            results_count: a.n("items").length
                        });
                        let m;
                        null == (m = a.gaPageview) || m.call(a, a.n("text").val());
                        if (a.isRedirectToFirstResult())
                            return a.doRedirectToFirstResult(),
                            !1;
                        a.hideLoader();
                        a.showResults();
                        a.scrollToResults();
                        a.lastSuccesfulSearch = d("form", a.n("searchsettings")).serialize() + a.n("text").val().trim();
                        a.lastSearchData = c;
                        a.updateHref();
                        0 == a.n("items").length ? null != a.n("showmore") && a.n("showmore").css("display", "none") : null != a.n("showmore") && (a.n("showmore").css("display", "block"),
                        d("span", a.n("showmore")).off(),
                        d("span", a.n("showmore")).on("click", function() {
                            var k = a.o.trigger.click;
                            k = "results_page" == k ? "?s=" + b.nicePhrase(a.n("text").val()) : "woo_results_page" == k ? "?post_type=product&s=" + b.nicePhrase(a.n("text").val()) : a.o.trigger.redirect_url.replace("{phrase}", b.nicePhrase(a.n("text").val()));
                            a.o.overridewpdefault ? "post" == a.o.override_method ? b.submitToUrl(a.o.homeurl + k, "post", {
                                asl_active: 1,
                                p_asl_data: d("form", a.n("searchsettings")).serialize()
                            }) : location.href = a.o.homeurl + k + "&asl_active=1&p_asid=" + a.o.id + "&p_asl_data=1&" + d("form", a.n("searchsettings")).serialize() : b.submitToUrl(a.o.homeurl + k, "post", {
                                np_asl_data: d("form", a.n("searchsettings")).serialize()
                            })
                        }))
                    },
                    fail: function(e) {
                        e.aborted || (a.n("resdrg").html(""),
                        a.n("resdrg").html('<div class="asl_nores">The request failed. Please check your connection! Status: ' + e.status + "</div>"),
                        a.nodes.items = d(".item", a.n("resultsDiv")),
                        a.hideLoader(),
                        a.showResults(),
                        a.scrollToResults())
                    }
                })
            }
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        searchFor: function(b) {
            "undefined" != typeof b && this.n("text").val(b);
            this.n("textAutocomplete").val("");
            this.search(!1, !1, !1, !0)
        },
        toggleSettings: function(b) {
            "undefined" != typeof b ? "show" == b ? this.showSettings() : this.hideSettings() : 1 == this.n("prosettings").data("opened") ? this.hideSettings() : this.showSettings()
        },
        closeResults: function(b) {
            "undefined" != typeof b && b && (this.n("text").val(""),
            this.n("textAutocomplete").val(""));
            this.hideResults();
            this.n("proloading").css("display", "none");
            this.hideLoader();
            this.searchAbort()
        },
        getStateURL: function() {
            let b = location.href, a;
            b = b.split("p_asid");
            b = b[0];
            b = b.replace("&asl_active=1", "");
            b = b.replace("?asl_active=1", "");
            b = "?" == b.slice(-1) ? b.slice(0, -1) : b;
            b = "&" == b.slice(-1) ? b.slice(0, -1) : b;
            a = 1 < b.indexOf("?") ? "&" : "?";
            return b + a + "p_asid=" + this.o.id + "&p_asl_data=1&" + d("form", this.n("searchsettings")).serialize()
        },
        resetSearch: function() {
            this.resetSearchFilters()
        },
        filtersInitial: function() {
            return 1 == this.n("searchsettings").find("input[name=filters_initial]").val()
        },
        filtersChanged: function() {
            return 1 == this.n("searchsettings").find("input[name=filters_changed]").val()
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.helpers, {
        Hooks: window.WPD.Hooks,
        deviceType: function() {
            let b = window.innerWidth;
            return 640 >= b ? "phone" : 1024 >= b ? "tablet" : "desktop"
        },
        detectIOS: function() {
            return "undefined" != typeof window.navigator && "undefined" != typeof window.navigator.userAgent ? null != window.navigator.userAgent.match(/(iPod|iPhone|iPad)/) : !1
        },
        detectIE: function() {
            var b = window.navigator.userAgent;
            let a = b.indexOf("MSIE ");
            b = b.indexOf("Trident/");
            return 0 < a || 0 < b ? !0 : !1
        },
        isMobile: function() {
            try {
                return document.createEvent("TouchEvent"),
                !0
            } catch (b) {
                return !1
            }
        },
        isTouchDevice: function() {
            return "ontouchstart"in window
        },
        isSafari: function() {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        },
        whichjQuery: function(b) {
            let a = !1;
            "undefined" != typeof window.$ && ("undefined" === typeof b ? a = window.$ : "undefined" != typeof window.$.fn[b] && (a = window.$));
            !1 === a && "undefined" != typeof window.jQuery && (a = window.jQuery,
            "undefined" === typeof b ? a = window.jQuery : "undefined" != typeof window.jQuery.fn[b] && (a = window.jQuery));
            return a
        },
        formData: function(b, a) {
            let c = this
              , f = b.find("input,textarea,select,button").get();
            if (1 === arguments.length)
                return a = {},
                f.forEach(function(e) {
                    e.name && !e.disabled && (e.checked || /select|textarea/i.test(e.nodeName) || /text/i.test(e.type) || d(e).hasClass("hasDatepicker") || d(e).hasClass("asl_slider_hidden")) && (void 0 == a[e.name] && (a[e.name] = []),
                    d(e).hasClass("hasDatepicker") ? a[e.name].push(d(e).parent().find(".asl_datepicker_hidden").val()) : a[e.name].push(d(e).val()))
                }),
                JSON.stringify(a);
            "object" != typeof a && (a = JSON.parse(a));
            f.forEach(function(e) {
                if (e.name)
                    if (a[e.name]) {
                        let l = a[e.name]
                          , m = d(e);
                        "[object Array]" !== Object.prototype.toString.call(l) && (l = [l]);
                        if ("checkbox" == e.type || "radio" == e.type) {
                            let k = m.val()
                              , g = !1;
                            for (let h = 0; h < l.length; h++)
                                if (l[h] == k) {
                                    g = !0;
                                    break
                                }
                            m.prop("checked", g)
                        } else
                            m.val(l[0]),
                            (d(e).hasClass("asl_gochosen") || d(e).hasClass("asl_goselect2")) && WPD.intervalUntilExecute(function(k) {
                                k(e).trigger("change.asl_select2")
                            }, function() {
                                return c.whichjQuery("asl_select2")
                            }, 50, 3),
                            d(e).hasClass("hasDatepicker") && WPD.intervalUntilExecute(function(k) {
                                let g = l[0]
                                  , h = k(m.get(0)).datepicker("option", "dateFormat");
                                k(m.get(0)).datepicker("option", "dateFormat", "yy-mm-dd");
                                k(m.get(0)).datepicker("setDate", g);
                                k(m.get(0)).datepicker("option", "dateFormat", h);
                                k(m.get(0)).trigger("selectnochange")
                            }, function() {
                                return c.whichjQuery("datepicker")
                            }, 50, 3)
                    } else
                        "checkbox" != e.type && "radio" != e.type || d(e).prop("checked", !1)
            });
            return b
        },
        submitToUrl: function(b, a, c, f) {
            let e;
            e = d('<form style="display: none;" />');
            e.attr("action", b);
            e.attr("method", a);
            d("body").append(e);
            "undefined" !== typeof c && null !== c && Object.keys(c).forEach(function(l) {
                let m = c[l]
                  , k = d('<input type="hidden" />');
                k.attr("name", l);
                k.attr("value", m);
                e.append(k)
            });
            "undefined" != typeof f && "new" == f && e.attr("target", "_blank");
            e.get(0).submit()
        },
        openInNewTab: function(b) {
            Object.assign(document.createElement("a"), {
                target: "_blank",
                href: b
            }).click()
        },
        isScrolledToBottom: function(b, a) {
            return b.scrollHeight - b.scrollTop - d(b).outerHeight() < a
        },
        getWidthFromCSSValue: function(b, a) {
            b += "";
            b = -1 < b.indexOf("px") ? parseInt(b, 10) : -1 < b.indexOf("%") ? "undefined" != typeof a && null != a ? Math.floor(parseInt(b, 10) / 100 * a) : parseInt(b, 10) : parseInt(b, 10);
            return 100 > b ? 100 : b
        },
        nicePhrase: function(b) {
            return encodeURIComponent(b).replace(/%20/g, "+")
        },
        unqoutePhrase: function(b) {
            return b.replace(/["']/g, "")
        },
        decodeHTMLEntities: function(b) {
            let a = document.createElement("div");
            b && "string" === typeof b && (b = b.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, ""),
            b = b.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, ""),
            a.innerHTML = b,
            b = a.textContent,
            a.textContent = "");
            return b
        },
        isScrolledToRight: function(b) {
            return b.scrollWidth - d(b).outerWidth() === b.scrollLeft
        },
        isScrolledToLeft: function(b) {
            return 0 === b.scrollLeft
        },
        wp_hooks_apply_filters: function() {
            return "undefined" != typeof wp && "undefined" != typeof wp.hooks && "undefined" != typeof wp.hooks.applyFilters ? wp.hooks.applyFilters.apply(null, arguments) : "undefined" != typeof arguments[1] ? arguments[1] : !1
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        detectAndFixFixedPositioning: function() {
            let a = !1
              , c = this.n("search").get(0);
            for (; c; )
                if (c = c.parentElement,
                null != c && "fixed" == window.getComputedStyle(c).position) {
                    a = !0;
                    break
                }
            a || "fixed" == this.n("search").css("position") ? ("absolute" == this.n("resultsDiv").css("position") && this.n("resultsDiv").css({
                position: "fixed",
                "z-index": 2147483647
            }),
            this.o.blocking || this.n("searchsettings").css({
                position: "fixed",
                "z-index": 2147483647
            })) : ("fixed" == this.n("resultsDiv").css("position") && this.n("resultsDiv").css("position", "absolute"),
            this.o.blocking || this.n("searchsettings").css("position", "absolute"))
        },
        fixResultsPosition: function(a) {
            a = "undefined" == typeof a ? !1 : a;
            var c = d("body");
            let f = 0;
            var e = this.n("resultsDiv").css("position");
            if (0 != d._fn.bodyTransformY() || "static" != c.css("position"))
                f = c.offset().top;
            0 != d._fn.bodyTransformY() && "fixed" == e && (e = "absolute",
            this.n("resultsDiv").css("position", "absolute"));
            "fixed" == e && (f = 0);
            if ("fixed" == e || "absolute" == e)
                if (1 == a || "visible" == this.n("resultsDiv").css("visibility")) {
                    a = this.n("search").offset();
                    e = 0;
                    if (0 != d._fn.bodyTransformX() || "static" != c.css("position"))
                        e = c.offset().left;
                    if ("undefined" != typeof a) {
                        let l = 0;
                        c = "phone" == b.deviceType() ? this.o.results.width_phone : "tablet" == b.deviceType() ? this.o.results.width_tablet : this.o.results.width;
                        "auto" == c && (c = 240 > this.n("search").outerWidth() ? 240 : this.n("search").outerWidth());
                        this.n("resultsDiv").css("width", isNaN(c) ? c : c + "px");
                        "right" == this.o.resultsSnapTo ? l = this.n("resultsDiv").outerWidth() - this.n("search").outerWidth() : "center" == this.o.resultsSnapTo && (l = Math.floor((this.n("resultsDiv").outerWidth() - parseInt(this.n("search").outerWidth())) / 2));
                        this.n("resultsDiv").css({
                            top: a.top + this.n("search").outerHeight(!0) - f + "px",
                            left: a.left - l - e + "px"
                        })
                    }
                }
        },
        fixSettingsPosition: function(a) {
            a = "undefined" == typeof a ? !1 : a;
            var c = d("body")
              , f = 0
              , e = this.n("searchsettings").css("position");
            if (0 != d._fn.bodyTransformY() || "static" != c.css("position"))
                f = c.offset().top;
            0 != d._fn.bodyTransformY() && "fixed" == e && (e = "absolute",
            this.n("searchsettings").css("position", "absolute"));
            "fixed" == e && (f = 0);
            if (1 == a || 0 != this.n("prosettings").data("opened")) {
                a = 0;
                if (0 != d._fn.bodyTransformX() || "static" != c.css("position"))
                    a = c.offset().left;
                this.fixSettingsWidth();
                c = "none" != this.n("prosettings").css("display") ? this.n("prosettings") : this.n("promagnifier");
                e = c.offset();
                f = e.top + c.height() - 2 - f + "px";
                c = "left" == this.o.settingsimagepos ? e.left : e.left + c.width() - this.n("searchsettings").width();
                c = c - a + "px";
                this.n("searchsettings").css({
                    display: "block",
                    top: f,
                    left: c
                })
            }
        },
        fixSettingsWidth: function() {},
        hideOnInvisibleBox: function() {
            if (1 == this.o.detectVisibility && !this.n("search").hasClass("hiddend") && (this.n("search").is(":hidden") || !this.n("search").is(":visible"))) {
                let a;
                null == (a = this.hideSettings) || a.call(this);
                this.hideResults()
            }
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initMagnifierEvents: function() {
            let b = this;
            b.n("promagnifier").on("click", function(a) {
                b.keycode = a.keyCode || a.which;
                b.ktype = a.type;
                let c;
                null == (c = b.gaEvent) || c.call(b, "magnifier");
                if (b.n("text").val().length >= b.o.charcount && 1 == b.o.redirectOnClick && "first_result" != b.o.trigger.click)
                    return b.doRedirectToResults("click"),
                    clearTimeout(void 0),
                    !1;
                if ("ajax_search" != b.o.trigger.click && "first_result" != b.o.trigger.click)
                    return !1;
                b.searchAbort();
                clearTimeout(b.timeouts.search);
                b.n("proloading").css("display", "none");
                b.timeouts.search = setTimeout(function() {
                    d("form", b.n("searchsettings")).serialize() + b.n("text").val().trim() != b.lastSuccesfulSearch || !b.resultsOpened && !b.usingLiveLoader ? b.search() : b.isRedirectToFirstResult() ? b.doRedirectToFirstResult() : b.n("proclose").css("display", "block")
                }, b.o.trigger.delay)
            })
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initInputEvents: function() {
            let a = this
              , c = !1
              , f = function() {
                a.n("text").off("mousedown touchstart keydown", f);
                if (!c) {
                    a._initFocusInput();
                    a.o.trigger.type && a._initSearchInput();
                    a._initEnterEvent();
                    a._initFormEvent();
                    let e;
                    null == (e = a.initAutocompleteEvent) || e.call(a);
                    c = !0
                }
            };
            a.n("text").on("mousedown touchstart keydown", f, {
                passive: !0
            })
        },
        _initFocusInput: function() {
            let a = this;
            a.n("text").on("click", function(c) {
                c.stopPropagation();
                c.stopImmediatePropagation();
                d(this).trigger("focus");
                let f;
                null == (f = a.gaEvent) || f.call(a, "focus");
                if (d("form", a.n("searchsettings")).serialize() + a.n("text").val().trim() == a.lastSuccesfulSearch)
                    return a.resultsOpened || a.usingLiveLoader || (a._no_animations = !0,
                    a.showResults(),
                    a._no_animations = !1),
                    !1
            });
            a.n("text").on("focus input", function(c) {
                a.searching || ("" != d(this).val() ? a.n("proclose").css("display", "block") : a.n("proclose").css({
                    display: "none"
                }))
            })
        },
        _initSearchInput: function() {
            let a = this
              , c = a.n("text").val();
            a.n("text").on("input", function(f) {
                a.keycode = f.keyCode || f.which;
                a.ktype = f.type;
                if (b.detectIE()) {
                    if (c == a.n("text").val())
                        return !1;
                    c = a.n("text").val()
                }
                a.updateHref();
                if (a.n("text").val().length < a.o.charcount) {
                    a.n("proloading").css("display", "none");
                    if (0 == a.o.blocking) {
                        let e;
                        null == (e = a.hideSettings) || e.call(a)
                    }
                    a.hideResults(!1);
                    a.searchAbort();
                    clearTimeout(a.timeouts.search);
                    return !1
                }
                a.searchAbort();
                clearTimeout(a.timeouts.search);
                a.n("proloading").css("display", "none");
                a.timeouts.search = setTimeout(function() {
                    d("form", a.n("searchsettings")).serialize() + a.n("text").val().trim() != a.lastSuccesfulSearch || !a.resultsOpened && !a.usingLiveLoader ? a.search() : a.isRedirectToFirstResult() ? a.doRedirectToFirstResult() : a.n("proclose").css("display", "block")
                }, a.o.trigger.delay)
            })
        },
        _initEnterEvent: function() {
            let a = this, c, f = !1;
            a.n("text").on("keyup", function(e) {
                a.keycode = e.keyCode || e.which;
                a.ktype = e.type;
                if (13 == a.keycode) {
                    clearTimeout(c);
                    c = setTimeout(function() {
                        f = !1
                    }, 300);
                    if (f)
                        return !1;
                    f = !0
                }
                e = d(this).hasClass("orig");
                if (a.n("text").val().length >= a.o.charcount && e && 13 == a.keycode) {
                    let l;
                    null == (l = a.gaEvent) || l.call(a, "return");
                    1 == a.o.redirectOnEnter ? "first_result" != a.o.trigger.return ? a.doRedirectToResults(a.ktype) : a.search() : "ajax_search" == a.o.trigger.return && (d("form", a.n("searchsettings")).serialize() + a.n("text").val().trim() != a.lastSuccesfulSearch || !a.resultsOpened && !a.usingLiveLoader) && a.search();
                    clearTimeout(a.timeouts.search)
                }
            })
        },
        _initFormEvent: function() {
            let a = this;
            d(a.n("text").closest("form").get(0)).on("submit", function(c, f) {
                c.preventDefault();
                b.isMobile() ? a.o.redirectOnEnter ? (c = new Event("keyup"),
                c.keyCode = c.which = 13,
                this.n("text").get(0).dispatchEvent(c)) : (a.search(),
                document.activeElement.blur()) : "undefined" != typeof f && "ajax" == f && a.search()
            })
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initNavigationEvents: function() {
            let b = this
              , a = function(c) {
                let f = c.keyCode || c.which;
                if (0 < d(".item", b.n("resultsDiv")).length && "none" != b.n("resultsDiv").css("display") && "vertical" == b.o.resultstype) {
                    if (40 == f || 38 == f) {
                        var e = b.n("resultsDiv").find(".item.hovered");
                        b.n("text").trigger("blur");
                        0 == e.length ? b.n("resultsDiv").find(".item").first().addClass("hovered") : (40 == f && (0 == e.next(".item").length ? b.n("resultsDiv").find(".item").removeClass("hovered").first().addClass("hovered") : e.removeClass("hovered").next(".item").addClass("hovered")),
                        38 == f && (0 == e.prev(".item").length ? b.n("resultsDiv").find(".item").removeClass("hovered").last().addClass("hovered") : e.removeClass("hovered").prev(".item").addClass("hovered")));
                        c.stopPropagation();
                        c.preventDefault();
                        b.n("resultsDiv").find(".resdrg .item.hovered").inViewPort(50, b.n("resultsDiv").get(0)) || (e = b.n("resultsDiv").find(".resdrg .item.hovered").get(0),
                        null != e && "undefined" != typeof e.scrollIntoView && e.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        }))
                    }
                    13 == f && 0 < d(".item.hovered", b.n("resultsDiv")).length && (c.stopPropagation(),
                    c.preventDefault(),
                    d(".item.hovered a.asl_res_url", b.n("resultsDiv")).get(0).click())
                }
            };
            b.documentEventHandlers.push({
                node: document,
                event: "keydown",
                handler: a
            });
            d(document).on("keydown", a)
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initOtherEvents: function() {
            let a = this;
            if (b.isMobile() && b.detectIOS())
                a.n("text").on("touchstart", function() {
                    a.savedScrollTop = window.scrollY;
                    a.savedContainerTop = a.n("search").offset().top
                });
            a.n("proclose").on(a.clickTouchend, function(f) {
                f.preventDefault();
                f.stopImmediatePropagation();
                a.n("text").val("");
                a.n("textAutocomplete").val("");
                a.hideResults();
                a.n("text").trigger("focus");
                a.n("proloading").css("display", "none");
                a.hideLoader();
                a.searchAbort();
                0 < d(".asl_es_" + a.o.id).length ? (a.showLoader(),
                a.liveLoad(".asl_es_" + a.o.id, a.getCurrentLiveURL(), !1)) : a.o.resPage.useAjax && (a.showLoader(),
                a.liveLoad(a.o.resPage.selector, a.getRedirectURL()));
                a.n("text").get(0).focus()
            });
            if (b.isMobile()) {
                var c = function() {
                    a.orientationChange();
                    setTimeout(function() {
                        a.orientationChange()
                    }, 600)
                };
                a.documentEventHandlers.push({
                    node: window,
                    event: "orientationchange",
                    handler: c
                });
                d(window).on("orientationchange", c)
            } else
                c = function() {
                    a.resize()
                }
                ,
                a.documentEventHandlers.push({
                    node: window,
                    event: "resize",
                    handler: c
                }),
                d(window).on("resize", c, {
                    passive: !0
                });
            c = function() {
                a.scrolling(!1)
            }
            ;
            a.documentEventHandlers.push({
                node: window,
                event: "scroll",
                handler: c
            });
            d(window).on("scroll", c, {
                passive: !0
            });
            if (b.isMobile() && "" != a.o.mobile.menu_selector)
                d(a.o.mobile.menu_selector).on("touchend", function() {
                    let f = this;
                    setTimeout(function() {
                        let e = d(f).find("input.orig");
                        e = 0 == e.length ? d(f).next().find("input.orig") : e;
                        e = 0 == e.length ? d(f).parent().find("input.orig") : e;
                        e = 0 == e.length ? a.n("text") : e;
                        a.n("search").inViewPort() && e.get(0).focus()
                    }, 300)
                });
            b.detectIOS() && b.isMobile() && b.isTouchDevice() && 16 > parseInt(a.n("text").css("font-size")) && (a.n("text").data("fontSize", a.n("text").css("font-size")).css("font-size", "16px"),
            a.n("textAutocomplete").css("font-size", "16px"),
            d("body").append("<style>#ajaxsearchlite" + a.o.rid + " input.orig::-webkit-input-placeholder{font-size: 16px !important;}</style>"))
        },
        orientationChange: function() {
            this.detectAndFixFixedPositioning();
            this.fixSettingsPosition();
            this.fixResultsPosition();
            "isotopic" == this.o.resultstype && "visible" == this.n("resultsDiv").css("visibility") && (this.calculateIsotopeRows(),
            this.showPagination(!0),
            this.removeAnimation())
        },
        resize: function() {
            this.detectAndFixFixedPositioning();
            this.fixSettingsPosition();
            this.fixResultsPosition();
            "isotopic" == this.o.resultstype && "visible" == this.n("resultsDiv").css("visibility") && (this.calculateIsotopeRows(),
            this.showPagination(!0),
            this.removeAnimation())
        },
        scrolling: function(a) {
            this.detectAndFixFixedPositioning();
            this.hideOnInvisibleBox();
            this.fixSettingsPosition(a);
            this.fixResultsPosition(a)
        },
        initTryThisEvents: function() {
            let a = this;
            0 < a.n("trythis").find("a").length && (a.n("trythis").find("a").on("click touchend", function(c) {
                c.preventDefault();
                c.stopImmediatePropagation();
                document.activeElement.blur();
                a.n("textAutocomplete").val("");
                a.n("text").val(d(this).html());
                let f;
                null == (f = a.gaEvent) || f.call(a, "try_this");
                a.searchWithCheck(80)
            }),
            a.n("trythis").css({
                visibility: "visible"
            }))
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initResultsEvents: function() {
            let b = this;
            b.n("resultsDiv").css({
                opacity: "0"
            });
            let a = function(c) {
                let f = c.keyCode || c.which
                  , e = c.type;
                0 == d(c.target).closest(".asl_w").length && (b.hideOnInvisibleBox(),
                "click" == e && "touchend" == e && 3 == f || 0 == b.resultsOpened || 1 != b.o.closeOnDocClick || b.dragging || (b.hideLoader(),
                b.searchAbort(),
                b.hideResults()))
            };
            b.documentEventHandlers.push({
                node: document,
                event: b.clickTouchend,
                handler: a
            });
            d(document).on(b.clickTouchend, a);
            b.n("resultsDiv").on("click", ".results .item", function() {
                let c;
                null == (c = b.gaEvent) || c.call(b, "result_click", {
                    result_title: d(this).find("a.asl_res_url").text(),
                    result_url: d(this).find("a.asl_res_url").attr("href")
                })
            })
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        monitorTouchMove: function() {
            let b = this;
            b.dragging = !1;
            d("body").on("touchmove", function() {
                b.dragging = !0
            }).on("touchstart", function() {
                b.dragging = !1
            })
        }
    })
}
)(WPD.dom);
(function(d) {
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initAutop: function() {
            let b = this;
            if ("disabled" == b.o.autop.state)
                return !1;
            let a = window.location.href;
            if (-1 < a.indexOf("asl_ls=") || -1 < a.indexOf("asl_ls&"))
                return !1;
            let c = b.o.autop.count;
            window.WPD.intervalUntilExecute(function() {
                b.isAutoP = !0;
                "phrase" == b.o.autop.state ? (b.o.is_results_page || b.n("text").val(b.o.autop.phrase),
                b.search(c)) : "latest" == b.o.autop.state ? b.search(c, 1) : b.search(c, 2)
            }, function() {
                return !window.ASL.css_async || "undefined" != typeof window.ASL.css_loaded
            })
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initEtc: function() {
            b.Hooks.addFilter("asl/init/etc", this)
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite
      , a = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        init: function(c, f) {
            this.autopStartedTheSearch = this.isAutoP = this.triggerPrevState = this.searching = !1;
            this.autopData = {};
            this.resultsOpened = this.settingsChanged = this.resultsInitialized = this.settingsInitialized = !1;
            this.postAuto = this.post = null;
            this.scroll = {};
            this.savedContainerTop = this.savedScrollTop = 0;
            this.disableMobileScroll = !1;
            this.clickTouchend = "click touchend";
            this.mouseupTouchend = "mouseup touchend";
            this.noUiSliders = [];
            this.timeouts = {
                compactBeforeOpen: null,
                compactAfterOpen: null,
                search: null,
                searchWithCheck: null
            };
            this.eh = {};
            this.documentEventHandlers = [];
            this.settScroll = null;
            this.currentPage = 1;
            this.sIsotope = this.isotopic = null;
            this.lastSuccesfulSearch = "";
            this.lastSearchData = {};
            this._no_animations = !1;
            this.results_num = this.call_num = 0;
            this.o = d.fn.extend({}, c);
            this.nodes = {};
            this.nodes.search = d(f);
            a.isMobile() ? this.animOptions = this.o.animations.mob : this.animOptions = this.o.animations.pc;
            this.initNodeVariables();
            this.animationOpacity = 0 > this.animOptions.items.indexOf("In") ? "opacityOne" : "opacityZero";
            this.o.redirectOnClick = "ajax_search" != this.o.trigger.click && "nothing" != this.o.trigger.click;
            this.o.redirectOnEnter = "ajax_search" != this.o.trigger.return && "nothing" != this.o.trigger.return;
            if (this.usingLiveLoader = this.o.resPage.useAjax && 0 < d(this.o.resPage.selector).length || 0 < d(".asl_es_" + this.o.id).length)
                this.o.trigger.type = this.o.resPage.trigger_type,
                this.o.trigger.facet = this.o.resPage.trigger_facet,
                this.o.resPage.trigger_magnifier && (this.o.redirectOnClick = 0,
                this.o.trigger.click = "ajax_search"),
                this.o.resPage.trigger_return && (this.o.redirectOnEnter = 0,
                this.o.trigger.return = "ajax_search");
            this.monitorTouchMove();
            this.initEvents();
            this.initAutop();
            this.initEtc();
            b.firstIteration = !1;
            this.n("s").trigger("asl_init_search_bar", [this.o.id, this.o.iid], !0, !0);
            return this
        },
        n: function(c) {
            if ("undefined" === typeof this.nodes[c])
                switch (c) {
                case "s":
                    this.nodes[c] = this.nodes.search;
                    break;
                case "container":
                    this.nodes[c] = this.nodes.search.closest(".asl_w_container");
                    break;
                case "searchsettings":
                    this.nodes[c] = d(".asl_s", this.n("container"));
                    break;
                case "resultsDiv":
                    this.nodes[c] = d(".asl_r", this.n("container"));
                    break;
                case "probox":
                    this.nodes[c] = d(".probox", this.nodes.search);
                    break;
                case "proinput":
                    this.nodes[c] = d(".proinput", this.nodes.search);
                    break;
                case "text":
                    this.nodes[c] = d(".proinput input.orig", this.nodes.search);
                    break;
                case "textAutocomplete":
                    this.nodes[c] = d(".proinput input.autocomplete", this.nodes.search);
                    break;
                case "proloading":
                    this.nodes[c] = d(".proloading", this.nodes.search);
                    break;
                case "proclose":
                    this.nodes[c] = d(".proclose", this.nodes.search);
                    break;
                case "promagnifier":
                    this.nodes[c] = d(".promagnifier", this.nodes.search);
                    break;
                case "prosettings":
                    this.nodes[c] = d(".prosettings", this.nodes.search);
                    break;
                case "settingsAppend":
                    this.nodes[c] = d("#wpdreams_asl_settings_" + this.o.id);
                    break;
                case "resultsAppend":
                    this.nodes[c] = d("#wpdreams_asl_results_" + this.o.id);
                    break;
                case "trythis":
                    this.nodes[c] = d("#asp-try-" + this.o.rid);
                    break;
                case "hiddenContainer":
                    this.nodes[c] = d(".asl_hidden_data", this.n("container"));
                    break;
                case "aspItemOverlay":
                    this.nodes[c] = d(".asl_item_overlay", this.n("hiddenContainer"));
                    break;
                case "showmore":
                    this.nodes[c] = d(".showmore", this.n("resultsDiv"));
                    break;
                case "items":
                    this.nodes[c] = 0 < d(".item", this.n("resultsDiv")).length ? d(".item", this.n("resultsDiv")) : d(".photostack-flip", this.n("resultsDiv"));
                    break;
                case "results":
                    this.nodes[c] = d(".results", this.n("resultsDiv"));
                    break;
                case "resdrg":
                    this.nodes[c] = d(".resdrg", this.n("resultsDiv"))
                }
            return this.nodes[c]
        },
        initNodeVariables: function() {
            this.o.id = this.nodes.search.data("id");
            this.o.iid = this.nodes.search.data("instance");
            this.o.rid = this.o.id + "_" + this.o.iid;
            this.fixClonedSelf()
        },
        initEvents: function() {
            let c;
            null == (c = this.initSettingsSwitchEvents) || c.call(this);
            this.initOtherEvents();
            this.initMagnifierEvents();
            this.initInputEvents()
        }
    })
}
)(WPD.dom);
(function(d) {
    let b = window.WPD.ajaxsearchlite.helpers;
    d.fn.extend(window.WPD.ajaxsearchlite.plugin, {
        initResults: function() {
            if (!this.resultsInitialized) {
                this.initResultsBox();
                this.initResultsEvents();
                let a;
                null == (a = this.initNavigationEvents) || a.call(this)
            }
        },
        initResultsBox: function() {
            this.initResultsAnimations();
            b.isMobile() && 1 == this.o.mobile.force_res_hover ? (this.o.resultsposition = "hover",
            this.nodes.resultsDiv = this.n("resultsDiv").clone(),
            d("body").append(this.nodes.resultsDiv),
            this.nodes.resultsDiv.css({
                position: "absolute"
            }),
            this.detectAndFixFixedPositioning()) : "hover" == this.o.resultsposition && 0 >= this.n("resultsAppend").length ? (this.nodes.resultsDiv = this.n("resultsDiv").clone(),
            d("body").append(this.n("resultsDiv"))) : (this.o.resultsposition = "block",
            this.n("resultsDiv").css({
                position: "static"
            }),
            0 < this.n("resultsAppend").length && (0 < this.n("resultsAppend").find(".asl_w").length ? this.nodes.resultsDiv = this.n("resultsAppend").find(".asl_w") : (this.nodes.resultsDiv = this.n("resultsDiv").clone(),
            this.nodes.resultsAppend.append(this.n("resultsDiv")))));
            this.nodes.showmore = d(".showmore", this.n("resultsDiv"));
            this.nodes.items = 0 < d(".item", this.n("resultsDiv")).length ? d(".item", this.n("resultsDiv")) : d(".photostack-flip", this.n("resultsDiv"));
            this.nodes.results = d(".results", this.n("resultsDiv"));
            this.nodes.resdrg = d(".resdrg", this.n("resultsDiv"));
            this.n("resultsDiv").get(0).id = this.n("resultsDiv").get(0).id.replace("__original__", "");
            this.detectAndFixFixedPositioning();
            this.resultsInitialized = !0
        },
        initResultsAnimations: function() {
            this.resAnim = {
                showClass: "asl_an_fadeInDrop",
                showCSS: {
                    visibility: "visible",
                    display: "block",
                    opacity: 1,
                    "animation-duration": "300ms"
                },
                hideClass: "asl_an_fadeOutDrop",
                hideCSS: {
                    visibility: "hidden",
                    opacity: 0,
                    display: "none"
                },
                duration: 300
            };
            this.n("resultsDiv").css({
                "-webkit-animation-duration": "300ms",
                "animation-duration": "300ms"
            })
        }
    })
}
)(WPD.dom);
window.ASL = "undefined" !== typeof window.ASL ? window.ASL : {};
window.ASL.api = function() {
    let d = function(c, f, e, l) {
        c = ASL.instances.get(c, f);
        return !1 !== c && c[e].apply(c, [l])
    }
      , b = function(c, f, e) {
        if (!isNaN(parseFloat(f)) && isFinite(f))
            return c = ASL.instances.get(c, f),
            !1 !== c && c[e].apply(c);
        c = ASL.instances.get(c);
        return !1 !== c && c.forEach(function(l) {
            l[f].apply(l, [e])
        })
    }
      , a = function(c, f) {
        if ("exists" == f)
            return ASL.instances.exist(c);
        c = ASL.instances.get(c);
        return !1 !== c && c.forEach(function(e) {
            e[f].apply(e)
        })
    };
    if (4 == arguments.length)
        return d.apply(this, arguments);
    if (3 == arguments.length)
        return b.apply(this, arguments);
    if (2 == arguments.length)
        return a.apply(this, arguments);
    0 == arguments.length && (console.log("Usage: ASL.api(id, [optional]instance, function, [optional]args);"),
    console.log("For more info: https://knowledgebase.ajaxsearchlite.com/other/javascript-api"))
}
;